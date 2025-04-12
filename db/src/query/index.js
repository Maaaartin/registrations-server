module.exports = async () => {
  const query = process.argv[3];
  const client = require('../client')();
  await client.connect();
  const res = await client.query(query);
  console.log(res.rows, res.rowCount);
  await client.end();
};
