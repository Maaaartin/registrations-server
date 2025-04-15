import type { NextApiRequest, NextApiResponse } from 'next';
import { DDiscover } from '../../content/decoders';
import queries from '../../../prisma/client/sql';
import { unstable_cache } from 'next/cache';
import { MAX_COUNT } from '../../content/data';
import { transaction } from '../../../prisma/queries';

type Params = ReturnType<typeof DDiscover.parse>;

const fetchCount = unstable_cache(
  async (params: Params) => {
    const {
      tovarni_znacka,
      typ,
      datum_prvni_registrace_do,
      datum_prvni_registrace_od,
      pohon,
      imported,
      removed,
      rok_vyroby_od,
      rok_vyroby_do
    } = params;
    return transaction(
      async (tx) => {
        const result = await tx.$queryRawTyped(
          queries.discoverVehiclesCount(
            tovarni_znacka || null,
            typ || null,
            datum_prvni_registrace_od || null,
            datum_prvni_registrace_do || null,
            rok_vyroby_od || null,
            rok_vyroby_do || null,
            pohon === 'electric' || null,
            pohon === 'hybrid' || null,
            imported || null,
            removed || null,
            MAX_COUNT
          )
        );
        return Number(result?.[0].count || 0);
      },
      MAX_COUNT,
      10000
    );
  },
  ['discoverCount'],
  { revalidate: 3600, tags: ['discoverCount'] }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const params = DDiscover.parse(req.query);
  const count = await fetchCount(params);
  res.send(count);
}
