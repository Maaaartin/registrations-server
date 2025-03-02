const readline = require('readline');
const { parse } = require('csv-parse/sync');
const client = require('../client');
const schema = require('../schema.json');
const headerMap = require('../headerMap.json');
const { logError, processRecord } = require('./helpers');
const { PassThrough, Readable } = require('stream');

const parseOptions = {
  columns: Object.keys(headerMap),
  relaxColumnCountMore: true,
  quote: String.fromCodePoint(0x0022),
  relaxQuotes: true
};
function parseAndProcess(line) {
  try {
    const [record] = parse(line, parseOptions);
    const values = processRecord(record);
    return values;
  } catch (error) {
    logError('./errors_csv.csv', error.message, JSON.stringify(line));
    return null;
  }
}

async function startWrite() {
  const res = await fetch('http://localhost:5000');
  const fetchStream = Readable.from(res.body);

  const rl = readline.createInterface({
    input: fetchStream,
    crlfDelay: Infinity
  });
  const columns = Object.keys(schema);
  const query = `INSERT INTO registrations (${columns.map(
    (column) => `"${column}"`
  )})
      VALUES (${columns.map((_, index) => `$${index + 1}`)})`;

  for await (const line of rl) {
    const { lineNr, data } = JSON.parse(line);
    if (lineNr % 1000 === 0) {
      console.log('Write', lineNr);
    }
    const values = parseAndProcess(data);
    if (!values) continue;
    try {
      await client.query(query, values);
    } catch (error) {
      logError(
        './errors_db.csv',
        error.message,
        JSON.stringify(values),
        lineNr
      );
    }
  }
  startWrite();
}
client
  .connect()
  .then(startWrite)
  .catch(() => {
    console.log('exited');
    return client.end();
  });
