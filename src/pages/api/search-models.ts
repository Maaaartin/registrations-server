import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { searchTypesForBrand } from '../../../prisma/client/sql';
import { DBrandModel } from '../../util/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const { tovarni_znacka, typ } = DBrandModel.parse(req.query);
  if (!tovarni_znacka || !typ) return res.send([]);
  const result = await prisma.$queryRawTyped(
    searchTypesForBrand(tovarni_znacka, typ, 10)
  );
  const brands = result.map((value) => value.typ as string);
  res.send(brands);
}
