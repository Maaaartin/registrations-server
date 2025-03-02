const net = require('net');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const readline = require('readline');
const schema = require('../schema.json');
const headerMap = require('../headerMap.json');
const { logError, createTableFromHeaders } = require('./helpers');

const columns = Object.keys(schema);
function parseDate(value) {
  const date = new Date(value);
  if (!isNaN(date.getMilliseconds())) {
    return date.toISOString();
  }
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (dateRegex.test(value)) {
    const [day, month, year] = value.split('.').map(Number);
    const date2 = new Date(year, month - 1, day);
    if (
      date2.getFullYear() === year &&
      date2.getMonth() === month - 1 &&
      date2.getDate() === day
    ) {
      return date2.toISOString();
    }
  }
  // console.info(`no date value,${value}`);
  return null;
}
function parseNumber(value = '') {
  return value.replaceAll(',', '.').replaceAll(' ', '');
}
function parseBoolean(value = '') {
  if (!value) {
    return null;
  }
  const valueLower = value.toLowerCase().trim();
  if (['false', 'ne'].includes(valueLower)) {
    return false;
  }
  return true;
}

function parseValue(value, type) {
  switch (type) {
    case 'DATE':
      return parseDate(value);
    case 'INTEGER':
      const parsedInt = parseNumber(value);
      const int = parseInt(parsedInt, 10);
      return isNaN(int) ? null : int;
    case 'REAL':
      const parsedFloat = parseNumber(value);
      const float = parseInt(parsedFloat, 10);
      return isNaN(float) ? null : float;
    case 'BOOLEAN':
      return parseBoolean(value);
    default:
      return value || null;
  }
}

function processRecord(record) {
  const mappedRecord = Object.entries(headerMap).reduce(
    (acc, [key, mapping]) => {
      const delimiter =
        typeof mapping === 'object' && 'delimiter' in mapping
          ? mapping.delimiter
          : '/';
      const fields =
        typeof mapping === 'object' && 'fields' in mapping
          ? mapping.fields
          : [mapping].flat();
      const values = (record[key] || '').split(delimiter).map((v) => v.trim());
      fields.forEach((column, index) => {
        acc[column] = parseValue(values[index], schema[column]);
      });
      return acc;
    },
    {}
  );
  const values = columns.map((c) => mappedRecord[c]);
  return values;
}

const sockets = [];

async function read() {
  const fileStream = fs.createReadStream(
    '/Users/martin/Downloads/RSV_vypis_vozidel_20250204.csv'
  );
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  const headerMapKeys = Object.keys(headerMap);
  const parseOptions = {
    columns: headerMapKeys,
    relaxColumnCountMore: true,
    quote: String.fromCodePoint(0x0022),
    relaxQuotes: true
  };
  let lineNr = 0;
  for await (const line of rl) {
    if (lineNr === 0) {
      lineNr++;
      continue;
    }
    if (lineNr % 1000 === 0) {
      console.log('Read', lineNr);
    }
    try {
      const [record] = parse(line + '\n', parseOptions);
      const values = processRecord(record);
      const index = Math.floor(Math.random() * sockets.length);
      const socket = sockets[index];
      socket.write(JSON.stringify({ lineNr, values }) + '\n');
    } catch (error) {
      await logError('./errors_read.csv', error.message, line, lineNr);
    }

    lineNr++;
  }
}

const server = net.createServer((socket) => {
  if (!sockets.length) {
    read();
  }
  sockets.push(socket);
  socket.once('end', () => {
    const index = sockets.findIndex(socket);
    sockets.splice(index, 1);
  });
});
server.listen(5000, () => {
  console.log('Server listening');
  createTableFromHeaders();
});

server.on('end', () => {
  console.log('Server ended');
});
