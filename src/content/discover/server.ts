import { unstable_cache } from 'next/cache';
import prisma from '../../../prisma';
import { pageSize } from './index';
import { serialize, vehicleSelect } from '../data';
import {
  discoverVehiclesBaseQuery,
  DiscoverVehiclesParams
} from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = unstable_cache(
  async ({ page, ...rest }: DiscoverVehiclesParams & { page: number }) => {
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

export const queryDecoder = DDiscover.merge(DPage);
