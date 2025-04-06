import type { NextApiRequest, NextApiResponse } from 'next';
import { discoverCount, vehicleIdsWithImports_ } from '../../../prisma/queries';
import { DDiscover } from '../../content/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const { imported, ...rest } = DDiscover.parse(req.query);
  if (imported) {
    const result = await vehicleIdsWithImports_(rest);
    res.send(result.length);
  } else {
    const result = await discoverCount(rest);
    res.send(result);
  }
}
