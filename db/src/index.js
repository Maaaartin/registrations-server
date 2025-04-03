const indices = require('./indices/createIndices');
const runImport = require('./dataImport/index');
const helpers = require('./dataImport/helpers');
const runQuery = require('./query/index');
const runDownload = require('./download');

async function run() {
  try {
    const command = process.argv[2];
    if (command === 'import') {
      console.log('running import');
      await runImport();
    } else if (command === 'indices') {
      console.log('running indices');
      await indices();
    } else if (command === 'table') {
      console.log('running table');
      await helpers.createTableFromHeaders();
    } else if (command === 'query') {
      await runQuery();
    } else if (command === 'download') {
      await runDownload();
    } else {
      console.error(`unknown command ${command}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
