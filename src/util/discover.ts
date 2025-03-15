import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../prisma';
import { Vehicles } from './search';
import { DBrandModel, DDate } from './decoders';

export const pageSize = 20;

export const discoverVehicles = unstable_cache(
  (
    page: number,
    tovarni_znacka: string,
    type: string,
    datum_prvni_registrace_od: Date | null
  ) =>
    prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: {
        tovarni_znacka: tovarni_znacka || undefined,
        typ: type || undefined,
        datum_1_registrace: datum_prvni_registrace_od
          ? { gte: datum_prvni_registrace_od }
          : undefined
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
    .transform((val) => Number(val) || 0),
  datum_prvni_registrace_od: DDate
});

export type DiscoverProps = {
  currentPage: number;
  tovarni_znacka: string;
  typ: string;
  vehicles: Vehicles;
  datum_prvni_registrace_od: string | null;
};
