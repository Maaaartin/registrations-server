import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { topColors } from '../../../prisma/client/sql';
import { ValueCountPairs } from '../../util/registrations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const data = await prisma.$queryRawTyped(topColors());
  const colors = data.map((value) => ({
    value: value.barva as string,
    count: Number(value.count)
  }));
  res.send(colors);
}
