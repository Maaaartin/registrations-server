const fs = require('fs');
const Timers = require('timers/promises');
const client = require('../client');
const {
  processRecord,
  escapeCSVValue,
  logError,
  getDirs
} = require('./helpers');
const { parse } = require('csv-parse');
const copyFrom = require('pg-copy-streams').from;
const { PassThrough, pipeline } = require('stream');
const path = require('path');

async function run() {
  const tableName = process.argv[3];
  const dirs = await getDirs();
  if (!dirs.includes(tableName)) {
    throw new Error(`Unknown table ${tableName}`);
  }
  const basePath = path.join(__dirname, '..', 'schemas', tableName);
  const fileStream = fs.createReadStream(
    path.join(process.cwd(), 'data', tableName + '.csv')
  );
  console.log(path.join(process.cwd(), 'data', tableName + '.csv'));
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

  const schema = require(path.join(basePath, 'schema.json'));
  await client.connect();
  await client.query('BEGIN');
  await client.query(`TRUNCATE ${tableName}`);

  const copyStream = client.query(
    copyFrom(
      `COPY ${tableName} (${Object.keys(schema).join(', ')}) FROM STDIN WITH CSV`
    )
  );

  const passThrough = new PassThrough();
  (async () => {
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
  })();

  const end = (msg) => async (err) => {
    console.log(msg);
    if (err) {
      await logError('./errors_db.csv', err.message);
      client.query('ROLLBACK');
    }
    process.exit(1);
  };
  fileStream.on('error', end('fileStream, error'));

  parser.on('error', end('parser, error'));
  parser.on('end', () => {
    passThrough.end();
  });

  pipeline(passThrough, copyStream, async (err) => {
    if (err) {
      console.error(err);
      await client.query('ROLLBACK');
      process.exit(1);
    }
    clearInterval(interval);
    await client.query('COMMIT');
    await client.end();
    console.log('all done');
  });
}

module.exports = run;
