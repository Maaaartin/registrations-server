const indices = require('./indices/createIndices');
const runImport = require('./dataImport/index');
const helpers = require('./dataImport/helpers');

const [, , command] = process.argv;

if (command === 'import') {
  console.log('running import');
  runImport();
} else if (command === 'indices') {
  console.log('running indices');
  indices();
} else if (command === 'table') {
  console.log('running table');
  helpers.createTableFromHeaders();
} else {
  console.error(`unknown command ${command}`);
}
