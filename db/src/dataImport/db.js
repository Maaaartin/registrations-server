const client = require('../client');
const schema = require('../schema-registrations.json');
const { logError, BATCH_SIZE } = require('./helpers');

const columns = Object.keys(schema);
const bulkQuery = `
    INSERT INTO registrations (${columns.map((column) => `"${column}"`)})
    VALUES ${new Array(BATCH_SIZE)
      .fill(null)
      .map(
        (_, rowIndex) =>
          `(${columns
            .map(
              (_, columnIndex) =>
                `$${rowIndex * columns.length + columnIndex + 1}`
            )
            .join(', ')})`
      )
      .join(', ')}
  `;

const query = `INSERT INTO registrations (${columns.map(
  (column) => `"${column}"`
)})
          VALUES (${columns.map((_, index) => `$${index + 1}`)})`;
exports.insertValues = async function (valueBatch) {
  try {
    await client.query(bulkQuery, valueBatch.flat());
  } catch (error) {
    for (const values of valueBatch) {
      try {
        await client.query(query, values);
      } catch (error) {
        logError('./errors_db.csv', error.message, JSON.stringify(values));
      }
    }
  }
};
