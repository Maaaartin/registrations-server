import type { NextApiRequest, NextApiResponse } from 'next';
import { ValueCountPairs } from '../../content/data';
import { topCategories_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const result = await topCategories_();
  res.send(result);
}
