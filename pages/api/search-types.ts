import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';
import { typesForBrand } from '@prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const brand = [req.query.brand].flat()[0];
  const typ = [req.query.type].flat()[0];
  if (!brand || !typ) return res.send([]);
  const result = await prisma.$queryRawTyped(typesForBrand(brand, typ, 10));
  const brands = result.map((value) => value.typ as string);
  res.send(brands);
}
