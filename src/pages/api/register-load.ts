import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  console.log(req.method);
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).send('Method not allowed');
  }

  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket?.remoteAddress ||
    null;

  await prisma.visits.create({
    data: {
      ip,
      user_agent: req.headers['user-agent'] || null,
      accept_language: req.headers['accept-language'] || null,
      referer: req.headers['referer'] || null
    }
  });
  res.status(200).send('OK');
}
