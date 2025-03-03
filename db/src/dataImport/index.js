const http = require('http');
const fs = require('fs');
const readline = require('readline');
const client = require('../client');
const schema = require('../schema.json');
const headerMap = require('../headerMap.json');
const {
  getBatch,
  processRecord,
  createTableFromHeaders
} = require('./helpers');
const { parseLines } = require('./parser');
const { insertValues } = require('./db');

async function run() {
  const lines = await getBatch();
  const records = parseLines(lines);
  const valueBatch = records.map(processRecord);
  await insertValues(valueBatch);
  await run();
}
client
  .connect()
  .then(createTableFromHeaders)
  .then(run)
  .catch((error) => {
    console.log('error', error);
  })
  .finally(() => {
    console.log('Finished');
    return client.end();
  });
