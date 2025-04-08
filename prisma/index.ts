import Timers from 'timers/promises';
import { PrismaClient } from './client';

const prisma = new PrismaClient();
const prismaExtended = prisma.$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query }) {
        const res = await Promise.race([
          query(args),
          Timers.setTimeout(30 * 1000, new Error('Query timeout'))
        ]);
        if (res instanceof Error) {
          throw res;
        }
        return res;
      }
    }
  }
});
export default prismaExtended as typeof prisma;
