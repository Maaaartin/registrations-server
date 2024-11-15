import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const data = await prisma.registrations.aggregate({
    _avg: {
      co2: true,
    },
    where: {
      co2: {
        not: null,
      },
      co2_mesto: {
        not: null,
      },
      co2_mimo_mesto: {
        not: null,
      },
    },
  });

  res.send(data._avg.co2 as number);
}
