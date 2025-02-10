const client = require('./client');

const idIndex = 'registrations_id_idx';
const znackaIndex = 'registrations_tovarni_znacka_idx';
const barvaIndex = 'registrations_barva_idx';
const datumIndex = 'datum_1_registrace';

async function dropIndices() {
  console.log('dropping indices');
  await Promise.all(
    [idIndex, znackaIndex, barvaIndex, datumIndex].map((indexName) =>
      client
        .query(`DROP INDEX IF EXISTS ${indexName};`)
        .then(() => console.log(`dropped index ${indexName}`))
    )
  );
  console.log('dropped indices');
}

async function createIndices() {
  console.log('creating indices');
  await client.query(
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS ${idIndex} ON registrations (id);`
  );

  console.log('created id index');
  await client.query(`CREATE INDEX CONCURRENTLY IF NOT EXISTS ${znackaIndex} 
ON registrations (tovarni_znacka);
`);

  console.log('created tovarni_znacka index');
  await client.query(`CREATE INDEX CONCURRENTLY IF NOT EXISTS ${barvaIndex} 
ON registrations (barva);`);
  console.log('created barva index');

  await client.query(`CREATE INDEX CONCURRENTLY idx_registrations_year
ON registrations (datum_1_registrace);`);
  await client.query(`CREATE INDEX CONCURRENTLY idx_registrations_year_extract
ON registrations (EXTRACT(YEAR FROM datum_1_registrace));`);
  console.log('created datum_1_registrace index');
}

async function run() {
  await client.connect();
  await dropIndices();
  await createIndices();
  await client.end();
}

run();
