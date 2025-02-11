import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';
import { registrationCountsByYear } from '@prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ year: number; count: number }[]>
) {
  const result = await prisma.$queryRawTyped(registrationCountsByYear());
  res.send(
    result.map((row) => ({
      year: Number(row.year),
      count: Number(row.count),
    }))
  );
}
