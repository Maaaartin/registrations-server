const indices = require('./indices/createIndices');
const runImport = require('./dataImport/index');

const [, , command] = process.argv;

if (command === 'import') {
  console.log('running import');
  runImport();
} else if (command === 'indices') {
  console.log('running indices');
  indices();
} else {
  console.error(`unknown command ${command}`);
}
