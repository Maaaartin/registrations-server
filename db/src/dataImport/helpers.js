const fs = require('fs');
const client = require('../client');
const schema = require('../schema.json');
const headerMap = require('../headerMap.json');

const BATCH_SIZE = 500;
exports.BATCH_SIZE = BATCH_SIZE;

function escapeCSVValue(value) {
  if (typeof value !== 'string') return value;
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

exports.escapeCSVValue = escapeCSVValue;
const logError = async function (file, ...data) {
  await fs.promises.appendFile(file, data.map(escapeCSVValue).join(',') + '\n');
};
exports.logError = logError;
exports.createTableFromHeaders = async () => {
  await client.connect();
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
  await client.end();
  console.log("Table 'registrations' created successfully.");
};

const columns = Object.keys(schema);
const currentYear = new Date().getFullYear();
function parseDate(value) {
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (dateRegex.test(value)) {
    const [day, month, year] = value.split('.').map(Number);
    const date2 = new Date(year, month - 1, day);
    if (currentYear < year) return null;
    if (
      date2.getFullYear() === year &&
      date2.getMonth() === month - 1 &&
      date2.getDate() === day
    ) {
      return date2.toISOString();
    }
  }
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
    case 'BIGINT':
      Number.MAX_SAFE_INTEGER;
      const parsedInt = parseNumber(value);
      const int = parseInt(parsedInt, 10);
      return isNaN(int) || int > Number.MAX_SAFE_INTEGER ? null : int;
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
