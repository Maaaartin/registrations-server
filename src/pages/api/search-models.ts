import type { NextApiRequest, NextApiResponse } from 'next';
import { searchModels_ } from '../../../prisma/queries';
import { DBrandModel } from '../../util/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const { tovarni_znacka, typ } = DBrandModel.parse(req.query);
  if (!tovarni_znacka || !typ) return res.send([]);
  const result = await searchModels_(tovarni_znacka, typ);
  res.send(result);
}
