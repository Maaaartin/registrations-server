const client = require('./client');

async function createIndices() {
  await client.connect();
  console.log('creating id index');
  await client.query('DROP INDEX IF EXISTS registrations_id_idx;');
  await client.query(
    'CREATE INDEX CONCURRENTLY IF NOT EXISTS registrations_id_idx ON registrations (id);'
  );
  console.log('created id index');
}

createIndices();
