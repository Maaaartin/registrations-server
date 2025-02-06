require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.DATABASE_USER,
  host: 'localhost',
  database: 'registrations_cz',
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});
module.exports = client;
