import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../../prisma';

export const searchVehicles = unstable_cache(
  (vin: string, cislo_tp: string, cislo_orv: string) =>
    prisma.registrations.findMany({
      where: {
        AND: [
          { key: 'vin', value: vin },
          { key: 'cislo_tp', value: cislo_tp },
          { key: 'cislo_orv', value: cislo_orv }
        ]
          .filter(({ value }) => value)
          .map(({ key, value }) => ({ [key]: { equals: value } }))
      },
      select: {
        id: true,
        tovarni_znacka: true,
        typ: true,
        vin: true,
        cislo_tp: true,
        cislo_orv: true
      }
    }),

  ['search'],
  { revalidate: 3600, tags: ['search'] }
);

export const queryDecoder = zod.object({
  vin: zod.string().default(''),
  cislo_tp: zod.string().default(''),
  cislo_orv: zod.string().default('')
});
