import type { NextApiRequest, NextApiResponse } from 'next';
import { vehicleIdsWithImports_ } from '../../../prisma/queries';
import { DDiscover } from '../../content/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const params = DDiscover.parse(req.query);
  const result = await vehicleIdsWithImports_(params);
  res.send(result.length);
}
