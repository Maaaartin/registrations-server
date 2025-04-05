const fs = require('fs');
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

let client;
async function copyFromCsv(tableName) {
  const dirs = await getDirs();
  if (!dirs.includes(tableName)) {
    throw new Error(`Unknown table ${tableName}`);
  }
  const basePath = path.join(__dirname, '..', 'schemas', tableName);
  const fileStream = fs.createReadStream(
    path.join(process.cwd(), 'data', tableName + '.csv')
  );
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

  fileStream.pipe(parser);
  let lineNr = 0;
  const interval = setInterval(() => {
    console.log('line', lineNr);
  }, 1000);
  const tempTableName = 'temp_' + tableName;
  const schema = require(path.join(basePath, 'schema.json'));

  await client.query('BEGIN');

  const copyStream = client.query(
    copyFrom(
      `COPY ${tempTableName} (${Object.keys(schema).join(', ')}) FROM STDIN WITH CSV`
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

  const end = (msg) => async (err) => {
    console.log(msg);
    if (err) {
      await logError('./errors_db.csv', err.message);
      await client.query('ROLLBACK');
    }
  };
  fileStream.on('error', end('fileStream, error'));

  parser.on('error', end('parser, error'));
  parser.on('end', () => {
    passThrough.end();
  });

  return new Promise((resolve, reject) => {
    pipeline(passThrough, copyStream, async (err) => {
      if (err) {
        console.error(err);
        await client.query('ROLLBACK');
        reject(err);
      }
      clearInterval(interval);
      await client.query('COMMIT');
      console.log('all done');
      resolve();
    });
  });
}

async function copyToTable(tableName) {
  try {
    await client.query('BEGIN');
    await client.query(`TRUNCATE ${tableName}`);
    console.log('copying table');
    await client.query(`INSERT INTO ${tableName}
  SELECT * FROM temp_${tableName};`);
    await client.query('COMMIT');
    console.log('copied table');
    await client.query(`DROP TABLE temp_${tableName};`);
  } catch (error) {
    console.log(error);
    await client.query('ROLLBACK');
    throw error;
  }
}

module.exports = async () => {
  const tableName = process.argv[3];

  const tempTableName = 'temp_' + tableName;
  await createTableFromHeaders(tempTableName);
  client = require('../client')();
  await client.connect();
  try {
    await copyFromCsv(tableName);
    await copyToTable(tableName);
  } finally {
    await client.end();
  }
};
