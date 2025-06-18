const indices = require('./indices/createIndices');
const runImport = require('./dataImport/index');
const helpers = require('./dataImport/helpers');
const runQuery = require('./query/index');
const runDownload = require('./download');
const runElastic = require('./elastic');
const createVisits = require('./visits');

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
      const tableName = process.argv[3];
      await helpers.createTableFromHeaders(tableName);
    } else if (command === 'query') {
      await runQuery();
    } else if (command === 'download') {
      await runDownload();
    } else if (command === 'elastic') {
      await runElastic();
    } else if (command === 'visits') {
      await createVisits();
    } else {
      console.error(`unknown command ${command}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
