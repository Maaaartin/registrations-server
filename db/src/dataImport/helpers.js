const fs = require('fs');
const path = require('path');

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

const getDirs = () => {
  const dirPath = path.join(__dirname, '..', 'schemas');
  return fs.promises.readdir(dirPath);
};
exports.getDirs = getDirs;
exports.logError = logError;
exports.createTableFromHeaders = async (tableName) => {
  const originalTableName = tableName.replace('temp_', '');
  const dirs = await getDirs();
  if (!dirs.includes(originalTableName)) {
    throw new Error(`Unknown table ${originalTableName}`);
  }
  const schema = require(
    path.join(__dirname, '..', 'schemas', originalTableName, 'schema.json')
  );
  const client = require('../client')();
  await client.connect();

  const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id SERIAL PRIMARY KEY,
          ${Object.entries(schema)
            .map(([column, type]) => `"${column}" ${type}`)
            .join(',\n')}
        );
      `;

  // await client.query(createOriginalTable);
  await client.query(createTableQuery);
  await client.end();
  console.log(`Table '${tableName}' created successfully.`);
};

const currentYear = new Date().getFullYear();
function parseDate(value) {
  const date = new Date(value);
  if (isNaN(date.getMilliseconds())) {
    return null;
  }
  return date;
}
function parseNumber(value = '') {
  return value.replaceAll(',', '.').replaceAll(' ', '');
}
function parseBoolean(value = '') {
  const valueLower = value.toLowerCase().trim();
  if (['false', 'ne'].includes(valueLower)) {
    return false;
  }
  if (['true', 'ano'].includes(valueLower)) {
    return true;
  }
  return null;
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

exports.processRecord = function (headerMap, schema, record) {
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
  const values = Object.keys(schema).map((c) => mappedRecord[c]);
  return values;
};
