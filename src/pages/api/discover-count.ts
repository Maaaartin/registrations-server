import type { NextApiRequest, NextApiResponse } from 'next';
import { DDiscover } from '../../content/decoders';
import { buildDiscoverWhere } from '../../content/discover/server';
import prisma from '../../../prisma';
import { Prisma } from '../../../prisma/client';
import { withCache } from '../../redis';
import { MAX_COUNT } from '../../content/data';

type Params = ReturnType<typeof DDiscover.parse>;

const fetchCount = async (params: Params) =>
  withCache(
    async () => {
      const whereClause = buildDiscoverWhere({
        ...params,
        page: 0,
        pageSize: 0
      });

      const [{ count }] = await prisma.$queryRaw<
        { count: bigint }[]
      >(Prisma.sql`
        SELECT COUNT(*)::bigint AS count
        FROM (
          SELECT 1
          FROM registrations r
          ${whereClause}
          LIMIT ${MAX_COUNT + 1}
        ) limited
      `);

      return Math.min(Number(count), MAX_COUNT);
    },
    'discoverCount' + JSON.stringify(params)
  );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const params = DDiscover.parse(req.query);
  const count = await fetchCount(params);
  res.send(count);
}
