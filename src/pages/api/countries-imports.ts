import type { NextApiRequest, NextApiResponse } from 'next';
import { countriesImports_ } from '../../../prisma/queries';
import { ValueCountPairs } from '../../util/data';
import zod from 'zod';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ValueCountPairs>
) {
  const result = await countriesImports_();
  res.send(result);
}
