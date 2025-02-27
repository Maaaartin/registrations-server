const fs = require('fs');
const path = require('path');
const client = require('./client');

const dirPath = path.resolve(__dirname, './sql');
async function run() {
  const dir = await fs.promises.readdir(dirPath);
  const queries = await Promise.all(
    dir.map((fileName) =>
      fs.promises.readFile(path.join(dirPath, fileName), 'ascii')
    )
  );
  await client.connect();
  for (const query of queries) {
    await client.query(query);
    console.log(`ran query ${query}`);
  }
  await client.end();
}

run();
