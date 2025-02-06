require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const csv = require('csv-parser');
const schema = require('./schema.json');
const headerMap = require('./headerMap.json');

const client = new Client({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: 'registrations_cz',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});
const createTableFromHeaders = async () => {
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
  console.log("Table 'registrations' created successfully.");
};
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
async function importCSV() {
  try {
    await createTableFromHeaders();

    const stream = csv({
      separator: ',',
      mapHeaders: ({ index, header }) => {
        return header.trim();
      },
    });
    fs.createReadStream(
      '/Users/martin/Downloads/RSV_vypis_vozidel_20250101.csv'
    ).pipe(stream);
    const columns = Object.keys(schema);
    const query = `INSERT INTO registrations (${columns.map(
      (column) => `"${column}"`
    )})
          VALUES (${columns.map((_, index) => `$${index + 1}`)})`;
    let line = 1;
    for await (const record of stream.iterator()) {
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
          const values = (record[key] || '')
            .split(delimiter)
            .map((v) => v.trim());
          fields.forEach((column, index) => {
            acc[column] = parseValue(values[index], schema[column]);
          });
          return acc;
        },
        {}
      );
      const values = columns.map((c) => mappedRecord[c]);

      try {
        await client.query(query, values);
      } catch (error) {
        await fs.promises.appendFile(
          './errors.log',
          `${error.message};${JSON.stringify(record)};${line}`
        );
      }

      line++;
      if (line % 1000 === 0) console.log(line);
    }
  } catch (err) {
    console.error('Failed to connect or execute query:', err);
  }
}

importCSV();
