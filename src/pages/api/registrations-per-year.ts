import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { registrationCountsByYear } from '../../../prisma/client/sql';

const lastYear = new Date().getFullYear() - 1;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ year: number; count: number }[]>
) {
  const result = await prisma.$queryRawTyped(
    registrationCountsByYear(1920, lastYear)
  );
  res.send(
    result.map((row) => ({
      year: Number(row.year),
      count: Number(row.count)
    }))
  );
}
