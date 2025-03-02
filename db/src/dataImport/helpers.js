const fs = require('fs');
const client = require('../client');
const schema = require('../schema.json');

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
  await client.end();
};
