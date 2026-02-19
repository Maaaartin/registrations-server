import { PrismaClient } from './client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const adapter = new PrismaPg(
  new Pool({
    connectionString: process.env.DATABASE_URL,
    query_timeout: 30_000
  })
);
const prisma = new PrismaClient({
  log: ['error', 'warn'],
  adapter
});

export const isTimeoutError = (error: unknown) => {
  const prismaError = error as { code?: string; cause?: { kind?: string } };
  const message = (error as Error)?.message || '';

  return (
    ['P1008', 'P2010', 'P2028'].includes(prismaError.code || '') ||
    prismaError.cause?.kind === 'SocketTimeout' ||
    message.includes('Query read timeout')
  );
};

export default prisma;
