import type { NextApiRequest, NextApiResponse } from 'next';
import { DBrand } from '../../content/decoders';
import { topTypesForBrand_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const { tovarni_znacka } = DBrand.parse(req.query);
  if (!tovarni_znacka) return res.send([]);
  const result = await topTypesForBrand_(tovarni_znacka);
  res.send(result);
}
