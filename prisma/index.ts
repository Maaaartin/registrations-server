import { PrismaClient } from './client';

const prisma = new PrismaClient({ log: ['info'] });

export default prisma;
