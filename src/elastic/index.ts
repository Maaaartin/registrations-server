import { Client } from '@elastic/elasticsearch';
import {
  QueryDslQueryContainer,
  QueryDslRangeQueryBase
} from '@elastic/elasticsearch/lib/api/types';
import { DDiscover } from '../content/decoders';

export const es = new Client({ node: process.env.ELASTIC_URL });

const shutdown = () => es.close();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export function getDiscoverQuery({
  tovarni_znacka,
  typ,
  datum_prvni_registrace_do,
  datum_prvni_registrace_od,
  rok_vyroby_do,
  rok_vyroby_od,
  pohon,
  removed,
  imported
}: ReturnType<typeof DDiscover.parse>) {
  const must: QueryDslQueryContainer[] = [];
  const filter: QueryDslQueryContainer[] = [];

  if (tovarni_znacka) must.push({ match: { tovarni_znacka } });
  if (typ) must.push({ match: { obchodni_oznaceni: typ } });

  if (datum_prvni_registrace_od || datum_prvni_registrace_do) {
    const range: QueryDslRangeQueryBase = {};
    if (datum_prvni_registrace_od) range.gte = datum_prvni_registrace_od;
    if (datum_prvni_registrace_do) range.lte = datum_prvni_registrace_do;
    filter.push({ range: { datum_1_registrace: range } });
  }

  if (rok_vyroby_od || rok_vyroby_do) {
    const range: QueryDslRangeQueryBase = {};
    if (rok_vyroby_od) range.gte = rok_vyroby_od;
    if (rok_vyroby_do) range.lte = rok_vyroby_do;
    filter.push({ range: { rok_vyroby: range } });
  }

  if (pohon === 'electric') {
    filter.push({ term: { plne_elektricke_vozidlo: true } });
  }

  if (pohon === 'hybrid') {
    filter.push({ term: { hybridni_vozidlo: true } });
  }

  if (imported) {
    filter.push({ term: { imported: true } });
  }

  if (removed) {
    filter.push({ term: { removed: true } });
  }
  return {
    bool: {
      must,
      filter
    }
  };
}
