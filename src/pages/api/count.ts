import type { NextApiRequest, NextApiResponse } from 'next';
import * as db from '../../api/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const result = await db.getIdCount();
  const count = result?.data?.[0].count || 0;
  res.send(count);
}
