const client = require('../client')();
const { Client: ESClient } = require('@elastic/elasticsearch');
const schema = require('../schemas/registrations/schema.json');

const searchFields = [
  'id',
  'tovarni_znacka',
  'typ',
  'datum_1_registrace',
  'rok_vyroby',
  'pcv',
  'hybridni_vozidlo',
  'plne_elektricke_vozidlo'
];

const es = new ESClient({ node: 'http://elasticsearch:9200' });

function mapType(type) {
  switch (type) {
    case 'BIGINT':
      return 'long';
    case 'REAL':
      return 'float';
    default:
      return type.toLowerCase();
  }
}

function mapSchema() {
  const mappedEntries = Object.entries(schema)
    .filter(([key]) => {
      return searchFields.includes(key);
    })
    .map(([key, type]) => {
      return [key, { type: mapType(type) }];
    });
  return Object.fromEntries(mappedEntries);
}

module.exports = async function (fromLine = 0) {
  await client.connect();

  const batchSize = 1000;
  let lastId = fromLine;

  try {
    // await es.indices.delete({ index: 'registrations' });
    // await es.indices.create({
    //   index: 'registrations',
    //   body: {
    //     mappings: {
    //       properties: {
    //         ...mapSchema(),
    //         imported: { type: 'boolean' },
    //         removed: { type: 'boolean' }
    //       }
    //     }
    //   }
    // });

    while (true) {
      const res = await client.query(
        `SELECT ${searchFields} FROM registrations WHERE id > $1 ORDER BY id ASC LIMIT $2`,
        [lastId, batchSize]
      );
      console.log('elastic', lastId);

      if (res.rows.length === 0) {
        break;
      }
      const withPcv = res.rows
        .filter((r) => r.pcv !== null)
        .map((r) => Number(r.pcv));
      const [imported, removed] = await Promise.all([
        client.query(`SELECT pcv FROM imports WHERE pcv IN (${withPcv});`),
        client.query(
          `SELECT pcv FROM removed_vehicles WHERE pcv IN (${withPcv});`
        )
      ]);
      const importedSet = new Set(imported.rows.map((i) => i.pcv));
      const removedSet = new Set(removed.rows.map((i) => i.pcv));
      for (const row of res.rows) {
        const i = importedSet.has(row.pcv);
        const r = removedSet.has(row.pcv);
        await es.index({
          index: 'registrations',
          id: row.id.toString(),
          document: {
            ...row,
            imported: i,
            removed: r
          }
        });

        lastId = row.id;
      }
    }
    console.log('Synced to Elasticsearch');
  } finally {
    await client.end();
  }
};
