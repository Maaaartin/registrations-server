import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import prisma from '../../../prisma';

const decoder = z.object({ ico: z.string() });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const { ico } = decoder.parse(req.query);
  const owners = await prisma.owners.findMany({
    where: { ico },
    select: { pcv: true }
  });
  if (!owners.length) {
    return res.send(0);
  }
  const pcvs = owners.map((o) => o.pcv) as bigint[];
  const count = await prisma.registrations.count({
    where: { pcv: { in: pcvs } }
  });
  res.send(count);
}
