import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { topTypesForBrand } from '../../../prisma/client/sql';
import { DBrand } from '../../util/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const { tovarni_znacka } = DBrand.parse(req.query);
  if (!tovarni_znacka) return res.send([]);
  const result = await prisma.$queryRawTyped(
    topTypesForBrand(tovarni_znacka, 10)
  );
  const types = result.map((value) => value.typ as string);
  res.send(types);
}
