const fs = require('fs');
const path = require('path');
const client = require('../client');

const dirPath = path.resolve(__dirname, './scripts/');
async function create(p) {
  const scriptDirPath = path.join(dirPath, p);
  const [downCode, upCode] = await Promise.all(
    ['down.sql', 'up.sql'].map((script) =>
      fs.promises.readFile(path.join(scriptDirPath, script), 'ascii')
    )
  );
  console.log(`running down for ${p}`);
  await client.query(downCode);
  console.log(`ran down for ${p}`);
  console.log(`running up for ${p}`);
  await client.query(upCode);
  console.log(`ran up for ${p}`);
}

async function refresh(p) {
  const scriptDirPath = path.join(dirPath, p);
  const refreshCode = await fs.promises.readFile(
    path.join(scriptDirPath, 'refresh.sql'),
    'ascii'
  );
  console.log(`running refresh for ${p}`);
  await client.query(refreshCode);
  console.log(`ran refresh for ${p}`);
}

async function run() {
  const [, command, action] = process.argv;

  const dir = await fs.promises.readdir(dirPath);

  const scriptDirName = dir.find((dirName) => dirName === command);
  if (!scriptDirName) {
    throw new Error('Unknown command: ' + scriptDirName);
  }
  try {
    await client.connect();
    if (action === 'create') {
      await create(scriptDirName);
    }
    if (action === 'refresh') {
      await refresh(scriptDirName);
    } else {
      throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

module.exports = run;
