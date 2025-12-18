import { PrismaClient } from './client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const adapter = new PrismaPg(
  new Pool({ connectionString: process.env.DATABASE_URL })
);
const prisma = new PrismaClient({
  log: ['info', 'query', 'error', 'warn'],
  adapter
});

export default prisma;
