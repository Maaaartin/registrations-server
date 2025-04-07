import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import prisma from '../../../prisma';
import { defaultPageSize, maxPageSize, stringToPohon } from './index';
import { serialize } from '../data';
import {
  discoverVehiclesBaseQuery,
  DiscoverVehiclesParams,
  vehicleIdsWithImports_
} from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = unstable_cache(
  async ({
    page,
    pageSize,
    imported,
    ...rest
  }: DiscoverVehiclesParams & {
    page: number;
    pageSize: number;
    imported: boolean;
  }) => {
    if (!imported) {
      const res = await prisma.registrations.findMany({
        ...discoverVehiclesBaseQuery(rest),
        take: pageSize,
        skip: pageSize * page
      });
      return res.map(serialize);
    }
    const vehiclesWithImports = await vehicleIdsWithImports_({
      pagination: {
        page,
        pageSize
      },
      ...rest
    });
    const ids = vehiclesWithImports.map((v) => v.id) as number[];
    const result = await prisma.registrations.findMany({
      where: { id: { in: ids } }
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

const additionalDecoder = z.object({
  pohon: z.string().default('').transform(stringToPohon),
  imported: z
    .string()
    .default('')
    .transform((val) => {
      if (val === 'true') return true;
      return false;
    })
});

export const queryDecoder = DDiscover.merge(DPage)
  .merge(pageSizeDecoder)
  .merge(additionalDecoder);
