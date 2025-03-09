import fs from 'fs/promises';
import path from 'path';
import prisma from '../../prisma';

(async () => {
  const query = await fs.readFile(
    path.resolve(__dirname, 'query.sql'),
    'ascii'
  );
  const res = await prisma.$queryRawUnsafe(query);
  console.log(res);
})();
