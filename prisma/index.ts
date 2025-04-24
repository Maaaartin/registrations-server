import { PrismaClient } from './client';

const prisma = new PrismaClient({ log: ['info'] });

const shutdown = () => prisma.$disconnect();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default prisma;
