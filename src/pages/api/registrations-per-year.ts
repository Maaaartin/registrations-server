import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { registrationCountsByYear } from '../../../prisma/client/sql';
import { ValueCountPairs } from '../../util/registrations';

const lastYear = new Date().getFullYear() - 1;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const result = await prisma.$queryRawTyped(
    registrationCountsByYear(1920, lastYear)
  );
  res.send(
    result.map((row) => ({
      value: String(row.year),
      count: Number(row.count)
    }))
  );
}
