const fs = require('fs');
const path = require('path');
const client = require('../client');

const dirPath = path.resolve(__dirname, './scripts/');
const readFolders = () => fs.promises.readdir(dirPath);
async function create() {
  const dirs = await readFolders();
  for (const dir of dirs) {
    const [downCode, upCode] = await Promise.all(
      ['down.sql', 'up.sql'].map((script) =>
        fs.promises.readFile(path.join(dirPath, dir, script), 'ascii')
      )
    );
    console.log(`running down for ${dir}`);
    await client.query(downCode);
    console.log(`ran down for ${dir}`);
    console.log(`running up for ${dir}`);
    await client.query(upCode);
    console.log(`ran up for ${dir}`);
  }
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
  const [, , action] = process.argv;

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
