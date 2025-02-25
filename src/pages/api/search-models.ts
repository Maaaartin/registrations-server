import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { searchTypesForBrand } from '../../../prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const brand = [req.query.brand].flat()[0];
  const model = [req.query.model].flat()[0];
  if (!brand || !model) return res.send([]);
  const result = await prisma.$queryRawTyped(
    searchTypesForBrand(brand, model, 10)
  );
  const brands = result.map((value) => value.typ as string);
  res.send(brands);
}
