import type { NextApiRequest, NextApiResponse } from 'next';
import { DDiscover } from '../../content/decoders';
import { buildDiscoverWhere } from '../../content/discover/server';
import prisma from '../../../prisma';
import { Prisma } from '../../../prisma/client';
import { withCache } from '../../redis';

type Params = ReturnType<typeof DDiscover.parse>;

const fetchCount = async (params: Params) =>
  withCache(
    async () => {
      const whereClause = buildDiscoverWhere({
        ...params,
        page: 0,
        pageSize: 0
      });

      const [{ count }] = await prisma.$queryRaw<{ count: bigint }[]>(
        Prisma.sql`
          SELECT COUNT(*)::bigint AS count
          FROM registrations r
          ${whereClause}
        `
      );
      return Number(count);
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
