const fs = require('fs');
const path = require('path');

const dirPath = path.resolve(__dirname, './scripts/');
const readFolders = () => fs.promises.readdir(dirPath);

let client;
async function runDownAndUp(dirName) {
  const [downCode, upCode] = await Promise.all(
    ['down.sql', 'up.sql'].map((script) =>
      fs.promises.readFile(path.join(dirPath, dirName, script), 'ascii')
    )
  );
  console.log(`running down for ${dirName}`);
  await client.query(downCode);
  console.log(`ran down for ${dirName}`);
  console.log(`running up for ${dirName}`);
  await client.query(upCode);
  console.log(`ran up for ${dirName}`);
}

async function create() {
  const dirs = await readFolders();
  for (const dir of dirs) {
    await runDownAndUp(dir);
  }
}

async function refresh() {
  const dirs = await readFolders();
  for (const dir of dirs) {
    const refreshCode = await fs.promises.readFile(
      path.join(dirPath, dir, 'refresh.sql'),
      'ascii'
    );
    console.log(`running refresh for ${dir}`);
    try {
      await client.query(refreshCode);
      console.log(`ran refresh for ${dir}`);
    } catch (error) {
      console.log(`failed refresh ${dir}`);
      await runDownAndUp(dir);
    }
  }
}

async function run() {
  const [, , , action] = process.argv;
  client = require('../client')();
  try {
    await client.connect();
    if (action === 'create') {
      await create();
    } else if (action === 'refresh') {
      await refresh();
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
