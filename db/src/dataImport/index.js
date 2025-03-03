const PQueue = require('p-queue').default;
const client = require('../client');
const {
  getBatch,
  processRecord,
  createTableFromHeaders
} = require('./helpers');
const { parseLines } = require('./parser');
const { insertValues } = require('./db');

const queue = new PQueue({ concurrency: 3 });
async function run() {
  const lines = await getBatch();
  const records = parseLines(lines);
  const valueBatch = records.map(processRecord);
  if (queue.size >= 50) {
    console.log('holding queue');
    await queue.onIdle();
  }
  queue.add(() => insertValues(valueBatch));
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
