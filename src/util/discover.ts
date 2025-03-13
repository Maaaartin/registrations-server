import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../prisma';
import { Vehicles } from './search';
import { DBrandModel } from './decoders';

export const pageSize = 20;

export const discoverVehicles = unstable_cache(
  (page: number, tovarni_znacka: string, type: string) =>
    prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: {
        tovarni_znacka: tovarni_znacka || undefined,
        typ: type || undefined
      },
      select: {
        id: true,
        tovarni_znacka: true,
        typ: true,
        vin: true,
        cislo_tp: true
      }
    }),

  ['discover'],
  { revalidate: 3600, tags: ['discover'] }
);

export const queryDecoder = DBrandModel.extend({
  page: zod
    .string()
    .default('0')
    .transform((val) => Number(val) || 0)
});

export type DiscoverProps = {
  currentPage: number;
  tovarni_znacka: string;
  typ: string;
  vehicles: Vehicles;
};
