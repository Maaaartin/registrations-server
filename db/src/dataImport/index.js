const fs = require('fs');
const client = require('../client');
const {
  processRecord,
  createTableFromHeaders,
  escapeCSVValue,
  logError
} = require('./helpers');
const { parse } = require('csv-parse');
const copyFrom = require('pg-copy-streams').from;
const schema = require('../schema.json');
const headerMap = require('../headerMap.json');
const { PassThrough, pipeline } = require('stream');

function run() {
  const parser = parse({
    columns: Object.keys(headerMap),
    relaxColumnCount: true,
    quote: String.fromCodePoint(0x0022),
    relaxQuotes: true,
    record_delimiter: '\r\n',
    raw: true,
    fromLine: 1
  });

  const fileStream = fs.createReadStream(
    '/Users/martin/Downloads/RSV_vypis_vozidel_20250204.csv'
  );
  fileStream.pipe(parser);
  let lineNr = 0;
  const interval = setInterval(() => {
    console.log('line', lineNr);
  }, 1000);

  const copyStream = client.query(
    copyFrom(
      `COPY registrations (${Object.keys(schema).join(', ')}) FROM STDIN WITH CSV`
    )
  );

  const passThrough = new PassThrough();
  parser.on('readable', function () {
    let data;
    while ((data = parser.read()) !== null) {
      lineNr++;
      const values = processRecord(data.record);
      passThrough.write(values.map(escapeCSVValue).join(',') + '\n');
    }
  });

  const end = (msg) => async (err) => {
    console.log(msg);
    if (err) {
      await logError('./errors_db.csv', err.message);
    }
    process.exit(1);
  };
  fileStream.on('error', end('fileStream, error'));

  parser.on('error', end('parser, error'));
  parser.on('end', () => {
    passThrough.end();
  });

  pipeline(passThrough, copyStream, async (err) => {
    clearInterval(interval);
    console.log(err);
    await client.end();
    console.log('all done');
  });
}

module.exports = () => {
  return client.connect().then(createTableFromHeaders).then(run);
};
