import type { NextApiRequest, NextApiResponse } from 'next';
import { count_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const result = await count_();
  res.send(result);
}
