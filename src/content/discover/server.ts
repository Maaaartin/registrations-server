import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import prisma from '../../../prisma';
import { defaultPageSize, maxPageSize, stringToPohon } from './index';
import { serialize } from '../data';
import {
  DiscoverVehiclesParams,
  vehicleIdsWithImports_
} from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = unstable_cache(
  async ({
    page,
    pageSize,
    ...rest
  }: DiscoverVehiclesParams & { page: number; pageSize: number }) => {
    const ids = await vehicleIdsWithImports_({
      pagination: {
        page,
        pageSize
      },
      ...rest
    });
    const result = await prisma.registrations.findMany({
      where: { id: { in: ids } },
      omit: { pcv: true }
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

const pohonDecoder = z.object({
  pohon: z.string().default('').transform(stringToPohon)
});

export const queryDecoder = DDiscover.merge(DPage)
  .merge(pageSizeDecoder)
  .merge(pohonDecoder);
