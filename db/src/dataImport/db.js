const client = require('../client');
const schema = require('../schema.json');
const { logError } = require('./helpers');

function getBulkQuery(rowCount) {
  const columns = Object.keys(schema);
  const query = `
    INSERT INTO registrations (${columns.map((column) => `"${column}"`)})
    VALUES ${new Array(rowCount)
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
  return query;
}

exports.insertValues = async function (valueBatch) {
  try {
    await client.query(getBulkQuery(valueBatch.length), valueBatch.flat());
  } catch (error) {
    const columns = Object.keys(schema);
    const query = `INSERT INTO registrations (${columns.map(
      (column) => `"${column}"`
    )})
            VALUES (${columns.map((_, index) => `$${index + 1}`)})`;
    for (const values of valueBatch) {
      try {
        await client.query(query, values);
      } catch (error) {
        logError('./errors_db.csv', error.message, JSON.stringify(values));
      }
    }
  }
};
