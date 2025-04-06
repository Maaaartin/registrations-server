import Timers from 'timers/promises';
import { PrismaClient } from './client/default';

const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async $allOperations({ args, query }) {
        const res = await Promise.race([
          query(args),
          Timers.setTimeout(30 * 1000)
        ]);
        if (!res) {
          throw new Error('Query timeout');
        }
        return res;
      }
    }
  }
});
export default prisma;
