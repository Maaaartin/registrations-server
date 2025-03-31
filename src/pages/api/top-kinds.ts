import type { NextApiRequest, NextApiResponse } from 'next';
import { ValueCountPairs } from '../../content/data';
import { topKinds_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const result = await topKinds_();
  res.send(result);
}
