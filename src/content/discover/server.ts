import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import prisma from '../../../prisma';
import { defaultPageSize, maxPageSize, stringToPohon } from './index';
import { serialize } from '../data';
import { DiscoverVehiclesParams } from '../../../prisma/queries';
import queries from '../../../prisma/client/sql';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = unstable_cache(
  async ({
    page,
    pageSize,
    ...rest
  }: DiscoverVehiclesParams & {
    page: number;
    pageSize: number;
  }) => {
    const {
      tovarni_znacka,
      typ,
      datum_prvni_registrace_od,
      datum_prvni_registrace_do,
      pohon
    } = rest;
    const result = await prisma.$queryRawTyped(
      queries.discoverVehicles(
        tovarni_znacka || null,
        typ || null,
        datum_prvni_registrace_od || null,
        datum_prvni_registrace_do || null,
        pohon === 'electric' || null,
        pohon === 'hybrid' || null,
        rest.imported || null,
        null,
        null,
        null,
        null,
        pageSize,
        pageSize * page
      )
    );
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

const additionalDecoder = z.object({
  pohon: z.string().default('').transform(stringToPohon)
});

export const queryDecoder = DDiscover.merge(DPage)
  .merge(pageSizeDecoder)
  .merge(additionalDecoder);
