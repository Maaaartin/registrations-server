const Timers = require('timers/promises');
const {
  processRecord,
  escapeCSVValue,
  logError,
  getDirs,
  createTableFromHeaders
} = require('./helpers');
const { parse } = require('csv-parse');
const copyFrom = require('pg-copy-streams').from;
const { PassThrough, pipeline } = require('stream');
const path = require('path');
const https = require('https');
const mapping = require('../download/mapping.json');

let client;
function getDownloadUrl(tableName) {
  const mappingEntry = mapping.find((entry) => entry.tableName === tableName);
  if (!mappingEntry) {
    throw new Error(`No download URL configured for ${tableName}`);
  }
  return mappingEntry.url;
}

function fetchCsvStream(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        res.resume();
        return resolve(fetchCsvStream(res.headers.location));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(
          new Error(`Failed to download CSV from ${url} (${res.statusCode})`)
        );
      }
      resolve(res);
    });

    req.on('error', reject);
  });
}

async function copyFromCsv(tableName) {
  const dirs = await getDirs();
  if (!dirs.includes(tableName)) {
    throw new Error(`Unknown table ${tableName}`);
  }
  const basePath = path.join(__dirname, '..', 'schemas', tableName);
  const downloadStream = await fetchCsvStream(getDownloadUrl(tableName));
  const headerMap = require(path.join(basePath, 'headerMap.json'));
  const parser = parse({
    columns: Object.keys(headerMap),
    relaxColumnCount: true,
    quote: String.fromCodePoint(0x0022),
    relaxQuotes: true,
    record_delimiter: '\r\n',
    raw: true,
    fromLine: 2
  });

  downloadStream.pipe(parser);
  let lineNr = 0;
  const interval = setInterval(() => {
    console.log(tableName, 'line', lineNr);
  }, 10000);
  // const tempTableName = 'temp_' + tableName;
  const schema = require(path.join(basePath, 'schema.json'));

  await client.query('BEGIN');
  await client.query(`TRUNCATE ${tableName} RESTART IDENTITY`);

  const copyStream = client.query(
    copyFrom(
      `COPY ${tableName} (${Object.keys(schema).join(', ')}) FROM STDIN WITH CSV`
    )
  );

  const passThrough = new PassThrough();
  parser.once('readable', async () => {
    for await (const data of parser.iterator()) {
      lineNr++;
      const values = processRecord(headerMap, schema, data.record);
      const canWrite = passThrough.write(
        values.map(escapeCSVValue).join(',') + '\n'
      );
      if (!canWrite) {
        await Timers.setTimeout(1000);
        console.log('waiting');
      }
    }
  });

  parser.on('end', () => {
    passThrough.end();
  });

  return new Promise((resolve, reject) => {
    let aborted = false;
    const abort = async (err, source) => {
      if (aborted) return;
      aborted = true;
      if (err) {
        await logError('./errors_db.csv', err.message);
      }
      try {
        await client.query('ROLLBACK');
      } catch (rollbackErr) {
        console.error(`Rollback failed after ${source}`, rollbackErr);
      }
      reject(err || new Error(`${source} failed`));
    };

    downloadStream.on('error', (err) => abort(err, 'downloadStream'));
    parser.on('error', (err) => abort(err, 'parser'));

    pipeline(passThrough, copyStream, async (err) => {
      clearInterval(interval);
      if (aborted) return;
      if (err) {
        console.error(err);
        return abort(err, 'pipeline');
      }
      await client.query('COMMIT');
      console.log(tableName, 'all done');
      resolve();
    });
  });
}

module.exports = async () => {
  const tableName = process.argv[3];

  await createTableFromHeaders(tableName);
  client = require('../client')();
  await client.connect();
  try {
    await copyFromCsv(tableName);
  } finally {
    await client.end();
  }
};
