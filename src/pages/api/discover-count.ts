import type { NextApiRequest, NextApiResponse } from 'next';
import { DDiscover } from '../../content/decoders';
import prisma from '../../../prisma';
import queries from '../../../prisma/client/sql';
import { unstable_cache } from 'next/cache';
import { MAX_COUNT } from '../../content/data';

type Params = ReturnType<typeof DDiscover.parse>;

const fetchCount = unstable_cache(
  async (params: Params) => {
    const {
      tovarni_znacka,
      typ,
      datum_prvni_registrace_do,
      datum_prvni_registrace_od,
      pohon,
      imported
    } = params;
    const result = await prisma.$queryRawTyped(
      queries.discoverVehiclesCount(
        tovarni_znacka || null,
        typ || null,
        datum_prvni_registrace_od || null,
        datum_prvni_registrace_do || null,
        pohon === 'electric' || null,
        pohon === 'hybrid' || null,
        imported || null,
        null,
        null,
        null,
        null,
        MAX_COUNT
      )
    );
    const count = Number(result?.[0].count || 0);
    return count;
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
