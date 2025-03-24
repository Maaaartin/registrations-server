import type { NextApiRequest, NextApiResponse } from 'next';
import { searchBrands_ } from '../../../prisma/queries';
import { DBrand } from '../../util/decoders';
import { ValueCountPairs } from '../../util/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const { tovarni_znacka } = DBrand.parse(req.query);
  if (!tovarni_znacka) return res.send([]);
  const result = await searchBrands_(tovarni_znacka);
  res.send(result);
}
