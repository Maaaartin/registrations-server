import type { NextApiRequest, NextApiResponse } from 'next';
import { lowestRegistrationDate_ } from '../../../prisma/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | null>
) {
  const result = await lowestRegistrationDate_();
  res.send(result);
}
