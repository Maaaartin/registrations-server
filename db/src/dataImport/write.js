const net = require('net');
const readline = require('readline');
const client = require('../client');
const schema = require('../schema.json');
const { logError } = require('./helpers');

async function startWrite(socket) {
  await client.connect();
  const rl = readline.createInterface({
    input: socket,
    crlfDelay: Infinity
  });
  const columns = Object.keys(schema);
  const query = `INSERT INTO registrations (${columns.map(
    (column) => `"${column}"`
  )})
      VALUES (${columns.map((_, index) => `$${index + 1}`)})`;

  for await (const line of rl) {
    const { lineNr, values } = JSON.parse(line);
    if (lineNr % 1000 === 0) {
      console.log('Write', lineNr);
    }
    try {
      await client.query(query, values);
    } catch (error) {
      await logError(
        './errors_write.csv',
        error.message,
        JSON.stringify(values),
        lineNr
      );
    }
  }
}

const socket = net.createConnection({ host: 'localhost', port: 5000 });
socket.on('connect', async () => {
  startWrite(socket);
});

socket.on('end', () => {
  console.log('Write ended');
  client.end();
});
