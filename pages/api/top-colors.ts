import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ value: string; count: number }[]>
) {
  const data = await prisma.registrations.groupBy({
    by: ['barva'],
    _count: {
      barva: true,
    },
    where: {
      barva: { not: null },
    },
    orderBy: {
      _count: {
        barva: 'desc',
      },
    },
    take: 10,
  });

  const colors = data.map((value) => ({
    value: value.barva as string,
    count: value._count.barva,
  }));
  res.send(colors);
}
