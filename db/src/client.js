require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: 'postgres',
  database: 'registrations_cz',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
module.exports = client;
