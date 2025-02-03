import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      year: number;
      count: number;
    }[]
  >
) {
  const result = await prisma.$queryRaw<{ year: number; count: bigint }[]>`
    SELECT EXTRACT(YEAR FROM "datum_1_registrace")::INTEGER AS year, COUNT(*) AS count
    FROM "registrations"
    WHERE "datum_1_registrace" IS NOT NULL
    GROUP BY year
    ORDER BY year ASC;
  `;

  const formattedResult = result.map((row) => ({
    year: row.year,
    count: Number(row.count),
  }));
  res.send(formattedResult);
}
