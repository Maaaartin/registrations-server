const query = `CREATE TABLE visits (
  id SERIAL PRIMARY KEY,
  ip TEXT,
  user_agent TEXT,
  accept_language TEXT,
  referer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

module.exports = async () => {
  const client = require('../client')();
  await client.connect();
  await client.query(query);
  console.log('created visits table');
  await client.end();
};
