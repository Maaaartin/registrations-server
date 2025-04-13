import { PrismaClient } from './client';

const prismaBase = new PrismaClient();
const prisma = prismaBase.$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query }) {
        try {
          return await prismaBase.$transaction(() => query(args), {
            timeout: 30 * 1000
          });
        } catch (error) {
          if (
            error instanceof Error &&
            error.message.match(/Transaction API error/)
          ) {
            throw new Error('Query timeout');
          }
          throw error;
        }
      }
    }
  }
});

export default prisma as typeof prismaBase;
