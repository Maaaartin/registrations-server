const fs = require('fs');
const readline = require('readline');
const client = require('../client');
const schema = require('../schema.json');
const headerMap = require('../headerMap.json');

function escapeCSVValue(value) {
  if (typeof value !== 'string') {
    value = String(value); // Convert non-strings (numbers, booleans) to string
  }

  if (
    value.includes(',') ||
    value.includes('"') ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    value = `"${value.replace(/"/g, '""')}"`; // Escape double quotes and wrap in quotes
  }

  return value;
}

exports.logError = async function (file, ...data) {
  await fs.promises.appendFile(file, data.map(escapeCSVValue).join(',') + '\n');
};

exports.createTableFromHeaders = async () => {
  await client.query(`DROP TABLE IF EXISTS registrations;`);

  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS registrations (
          id SERIAL PRIMARY KEY,
          ${Object.entries(schema)
            .map(([column, type]) => `"${column}" ${type}`)
            .join(',\n')}
        );
      `;

  await client.query(createTableQuery);
  console.log("Table 'registrations' created successfully.");
};

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

exports.processRecord = function (record) {
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
};

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
    if (lineNr % 1000 === 0) {
      console.log('line', lineNr);
    }
    lineNr++;
    yield line;
  }
})();

exports.getBatch = async function () {
  let count = 0;
  const lines = [];
  while (lines.length < 50) {
    const { value } = await lineIterator.next();
    if (!value) break;
    lines.push(value);
    count++;
  }
  return lines;
};
