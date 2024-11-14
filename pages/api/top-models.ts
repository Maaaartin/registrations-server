import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | Error>
) {
  if (typeof req.query.brand !== 'string') {
    return res.status(400).send(new Error('brand is required'));
  }
  const data = await prisma.registrations.groupBy({
    by: ['verze'],
    _count: {
      verze: true,
    },
    where: {
      verze:
        typeof req.query.model === 'string'
          ? { startsWith: req.query.model }
          : { not: null },
      tovarni_znacka: req.query.brand,
    },
    orderBy: {
      _count: {
        verze: 'desc',
      },
    },
    take: 10,
  });
  const models = data.map((value) => value.verze as string);
  res.send(models);
}
