import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { searchBrands } from '../../../prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const brand = req.query.brand;
  if (!brand) return res.send([]);
  const result = await prisma.$queryRawTyped(
    searchBrands([brand].flat()[0], 10)
  );
  const brands = result.map((value) => value.tovarni_znacka as string);
  res.send(brands);
}
