const Timers = require('timers/promises');
const PQueue = require('p-queue').default;
const client = require('../client');
const {
  getBatch,
  processRecord,
  createTableFromHeaders
} = require('./helpers');
const { parseLines } = require('./parser');
const { insertValues } = require('./db');

async function run() {
  const queue = new PQueue({ concurrency: 5 });
  do {
    const lines = await getBatch();
    if (!lines.length) {
      break;
    }
    const records = parseLines(lines);
    const valueBatch = records.map(processRecord);
    while (queue.size >= 30) {
      await Timers.setTimeout(10);
    }
    queue.add(() => insertValues(valueBatch));
  } while (true);
  await queue.onIdle();
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
