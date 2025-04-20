const fs = require('fs');
const Timers = require('timers/promises');
const {
  processRecord,
  escapeCSVValue,
  logError,
  getDirs,
  createTableFromHeaders
} = require('./helpers');
const { parse } = require('csv-parse');
const copyFrom = require('pg-copy-streams').from;
const { PassThrough, pipeline } = require('stream');
const path = require('path');

let client;
async function copyFromCsv(tableName) {
  const dirs = await getDirs();
  if (!dirs.includes(tableName)) {
    throw new Error(`Unknown table ${tableName}`);
  }
  const basePath = path.join(__dirname, '..', 'schemas', tableName);
  const fileStream = fs.createReadStream(
    path.join(process.cwd(), 'data', tableName + '.csv')
  );
  const headerMap = require(path.join(basePath, 'headerMap.json'));
  const parser = parse({
    columns: Object.keys(headerMap),
    relaxColumnCount: true,
    quote: String.fromCodePoint(0x0022),
    relaxQuotes: true,
    record_delimiter: '\r\n',
    raw: true,
    fromLine: 2
  });

  fileStream.pipe(parser);
  let lineNr = 0;
  const interval = setInterval(() => {
    console.log(tableName, 'line', lineNr);
  }, 10000);
  const tempTableName = 'temp_' + tableName;
  const schema = require(path.join(basePath, 'schema.json'));

  await client.query('BEGIN');

  const copyStream = client.query(
    copyFrom(
      `COPY ${tempTableName} (${Object.keys(schema).join(', ')}) FROM STDIN WITH CSV`
    )
  );

  const passThrough = new PassThrough();
  parser.once('readable', async () => {
    for await (const data of parser.iterator()) {
      lineNr++;
      const values = processRecord(headerMap, schema, data.record);
      const canWrite = passThrough.write(
        values.map(escapeCSVValue).join(',') + '\n'
      );
      if (!canWrite) {
        await Timers.setTimeout(1000);
        console.log('waiting');
      }
    }
  });

  const end = (msg) => async (err) => {
    console.log(msg);
    if (err) {
      await logError('./errors_db.csv', err.message);
      await client.query('ROLLBACK');
    }
  };
  fileStream.on('error', end('fileStream, error'));

  parser.on('error', end('parser, error'));
  parser.on('end', () => {
    passThrough.end();
  });

  return new Promise((resolve, reject) => {
    pipeline(passThrough, copyStream, async (err) => {
      if (err) {
        console.error(err);
        await client.query('ROLLBACK');
        reject(err);
      }
      clearInterval(interval);
      await client.query('COMMIT');
      console.log(tableName, 'all done');
      resolve();
    });
  });
}

async function copyToTable(tableName) {
  const batchSize = 5000;
  const tempTable = `temp_${tableName}`;
  let offset = 0;
  let rowCount = 0;

  try {
    console.log(`${tableName}: starting batched copy`);

    do {
      const batchQuery = `
        SELECT * FROM ${tempTable}
        ORDER BY id
        OFFSET $1 LIMIT $2;
      `;
      const { rows } = await client.query(batchQuery, [offset, batchSize]);
      rowCount = rows.length;
      offset += rowCount;

      if (rowCount > 0) {
        const columns = Object.keys(rows[0]);
        const columnList = columns.map((c) => `"${c}"`).join(', ');
        const valuePlaceholders = rows
          .map(
            (_, i) =>
              `(${columns.map((_, j) => `$${i * columns.length + j + 1}`).join(', ')})`
          )
          .join(', ');

        const updateClause = columns
          .filter((c) => c !== 'id')
          .map((c) => `"${c}" = EXCLUDED."${c}"`)
          .join(', ');

        const values = rows.flatMap((row) => columns.map((col) => row[col]));

        const upsertQuery = `
          INSERT INTO ${tableName} (${columnList})
          VALUES ${valuePlaceholders}
          ON CONFLICT (id) DO UPDATE SET ${updateClause};
        `;

        await client.query(upsertQuery, values);

        console.log(
          `${tableName}: inserted/updated ${rowCount} rows (offset ${offset})`
        );
      }
    } while (rowCount === batchSize);

    await client.query(`DROP TABLE ${tempTable}`);
    console.log(`${tableName}: finished copying and dropped temp table`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = async () => {
  const tableName = process.argv[3];

  const tempTableName = 'temp_' + tableName;
  await createTableFromHeaders(tempTableName);
  client = require('../client')();
  await client.connect();
  try {
    await copyFromCsv(tableName);
    await copyToTable(tableName);
  } finally {
    await client.end();
  }
};
