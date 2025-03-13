import type { NextApiRequest, NextApiResponse } from 'next';
import { getStats_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Awaited<ReturnType<typeof getStats_>>>
) {
  const result = await getStats_();
  res.send(result);
}
