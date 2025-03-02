const http = require('http');
const fs = require('fs');
const readline = require('readline');
const { createTableFromHeaders } = require('./helpers');

const fileStream = fs.createReadStream(
  '/Users/martin/Downloads/RSV_vypis_vozidel_20250204.csv'
);
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});
let lineNr = 0;
const lineIterator = (async function* () {
  for await (const line of rl) {
    if (lineNr === 0) {
      lineNr++;
      continue;
    }
    lineNr++;
    yield line;
  }
})();

const server = http.createServer(async (req, res) => {
  const linesToRead = 5000;
  let linesRead = 0;

  while (linesRead < linesToRead) {
    const { value: data, done } = await lineIterator.next();
    if (done) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      break;
    }
    if (linesRead === 0) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
    }
    res.write(`${JSON.stringify({ lineNr, data })}\n`);
    linesRead++;
  }
  res.end();
});
server.listen(5000, () => {
  console.log('Server listening');
  createTableFromHeaders();
});
