import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';
import { topColors } from '@prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ value: string; count: number }[]>
) {
  const data = await prisma.$queryRawTyped(topColors());
  const colors = data.map((value) => ({
    value: value.barva as string,
    count: Number(value.count),
  }));
  res.send(colors);
}
