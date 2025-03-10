import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { searchBrands } from '../../../prisma/client/sql';
import { DBrand } from '../../util/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const { tovarni_znacka } = DBrand.parse(req.query);
  if (!tovarni_znacka) return res.send([]);
  const result = await prisma.$queryRawTyped(searchBrands(tovarni_znacka, 10));
  const brands = result.map((value) => value.tovarni_znacka as string);
  res.send(brands);
}
