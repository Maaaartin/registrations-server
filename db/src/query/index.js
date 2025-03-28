const client = require('../client');

module.exports = async () => {
  const query = process.argv[3];
  await client.connect();
  const res = await client.query(query);
  console.log(res);
  await client.end();
};
