const createIndices = require('./indices/createIndices');
const runImport = require('./dataImport/index');

const [, , command] = process.argv;

if (command === 'import') {
  console.log('running import');
  runImport();
} else if (command === 'createIndices') {
  console.log('running createIndices');
  createIndices();
} else {
  console.error(`unknown command ${command}`);
}
