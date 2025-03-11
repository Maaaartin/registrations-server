const indices = require('./indices/createIndices');
const runImport = require('./dataImport/index');
const helpers = require('./dataImport/helpers');

async function run() {
  const [, , command] = process.argv;
  if (command === 'import') {
    console.log('running import');
    await runImport();
  } else if (command === 'indices') {
    console.log('running indices');
    await indices();
  } else if (command === 'table') {
    console.log('running table');
    await helpers.createTableFromHeaders();
  } else {
    console.error(`unknown command ${command}`);
  }
}

run();
