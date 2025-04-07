import type { NextApiRequest, NextApiResponse } from 'next';
import { discoverCount } from '../../../prisma/queries';
import { DDiscover } from '../../content/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const props = DDiscover.parse(req.query);
  const result = await discoverCount(props);
  res.send(result);
}
