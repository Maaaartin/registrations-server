module.exports = {
  db: {
    input: './src/api/schema.json',
    output: {
      target: './src/api/db.ts',
      baseUrl: `http://${process.env.POSTGREST_HOST}`
    }
  }
};
