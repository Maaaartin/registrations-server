import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { count } from '../../../prisma/client/sql';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const [result] = await prisma.$queryRawTyped(count());
  res.send(Number(result.count));
}
