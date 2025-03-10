import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { topKinds } from '../../../prisma/client/sql';
import { ValueCountPairs } from '../../util/registrations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const data = await prisma.$queryRawTyped(topKinds(10));
  const colors = data.map((value) => ({
    value: value.druh_vozidla as string,
    count: Number(value.count)
  }));
  res.send(colors);
}
