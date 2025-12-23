import type { NextApiRequest, NextApiResponse } from 'next';
import { searchFuels_ } from '../../../prisma/queries';
import { DDiscover } from '../../content/decoders';
import { ValueCountPairs } from '../../content/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const { palivo } = DDiscover.parse(req.query);
  const result = await searchFuels_(palivo || null);
  res.send(result);
}
