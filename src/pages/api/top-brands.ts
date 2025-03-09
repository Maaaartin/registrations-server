import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/index';
import { topBrands } from '../../../prisma/client/sql';
import { ValueCountPairs } from '../../util/registrations';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const result = await prisma.$queryRawTyped(topBrands());
  const mappedResult = result.map((value) => ({
    value: String(value.tovarni_znacka),
    count: Number(value.count)
  }));
  res.send(mappedResult);
}
