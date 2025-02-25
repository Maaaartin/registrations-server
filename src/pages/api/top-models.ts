import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { topTypesForBrand } from '../../../prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const brand = req.query.brand;
  if (!brand) return res.send([]);
  const result = await prisma.$queryRawTyped(
    topTypesForBrand([brand].flat()[0], 10)
  );
  const types = result.map((value) => value.typ as string);
  res.send(types);
}
