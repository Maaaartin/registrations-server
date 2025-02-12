import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';
import { topBrands } from '@prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const result = await prisma.$queryRawTyped(topBrands());
  const brands = result.map((value) => value.tovarni_znacka as string);
  res.send(brands);
}
