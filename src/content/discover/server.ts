import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import prisma from '../../../prisma';
import { defaultPageSize, maxPageSize } from './index';
import { serialize } from '../data';
import { DiscoverVehiclesParams } from '../../../prisma/queries';
import queries from '../../../prisma/client/sql';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = unstable_cache(
  async ({
    page,
    pageSize,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do,
    pohon,
    imported,
    removed
  }: DiscoverVehiclesParams) => {
    const result = await prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL statement_timeout = 30000`);
      return tx.$queryRawTyped(
        queries.discoverVehicles(
          tovarni_znacka || null,
          typ || null,
          datum_prvni_registrace_od || null,
          datum_prvni_registrace_do || null,
          pohon === 'electric' || null,
          pohon === 'hybrid' || null,
          imported || null,
          null,
          removed || null,
          null,
          null,
          pageSize,
          pageSize * page
        )
      );
    });

    return result.map(serialize);
  },

  ['discover'],
  { revalidate: 3600, tags: ['discover'] }
);

const pageSizeDecoder = z.object({
  pageSize: z
    .string()
    .default(String(defaultPageSize))
    .transform((val) => {
      const valNr = parseInt(val, 10);
      if (!valNr) {
        return defaultPageSize;
      }
      if (valNr >= maxPageSize) {
        return maxPageSize;
      }
      return valNr;
    })
});

export const queryDecoder = DDiscover.merge(DPage).merge(pageSizeDecoder);
