import { unstable_cache } from 'next/cache';
import { z } from 'zod';
import prisma from '../../../prisma';
import { defaultPageSize, maxPageSize } from './index';
import { serialize, vehicleSelect } from '../data';
import {
  discoverVehiclesBaseQuery,
  DiscoverVehiclesParams
} from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = unstable_cache(
  async ({
    page,
    pageSize,
    ...rest
  }: DiscoverVehiclesParams & { page: number; pageSize: number }) => {
    const result = await prisma.registrations.findMany({
      ...discoverVehiclesBaseQuery(rest),
      skip: page * pageSize,
      take: pageSize,
      select: vehicleSelect
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
