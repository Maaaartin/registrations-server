import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const data = await prisma.registrations.groupBy({
    by: ['tovarni_znacka'],
    _count: {
      tovarni_znacka: true,
    },
    where: {
      tovarni_znacka:
        typeof req.query.brand === 'string'
          ? { startsWith: req.query.brand }
          : { not: null },
    },
    orderBy: {
      _count: {
        tovarni_znacka: 'desc',
      },
    },
    take: 10,
  });

  const brands = data.map((value) => value.tovarni_znacka as string);
  res.send(brands);
}
