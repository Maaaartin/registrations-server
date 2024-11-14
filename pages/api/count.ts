import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const count = await prisma.registrations.count({
    select: { id: true },
  });
  res.send(count.id);
}
