import type { NextApiRequest, NextApiResponse } from 'next';
import { ValueCountPairs } from '../../content/data';
import { topBrands_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const result = await topBrands_();
  res.send(result);
}
