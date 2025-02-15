import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma';
import { registrations } from '@prisma/client';

const pageSize = 10;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<registrations[]>
) {
  const { brand, page } = req.query;
  const pageNr = parseInt([page].flat()[0] || '');
  const brandStr = [brand].flat()[0] || '';

  const vehicles = await prisma.registrations.findMany({
    skip: (pageNr - 1) * pageSize,
    take: pageSize,
    where: { tovarni_znacka: brandStr },
  });
  res.send(vehicles);
}
