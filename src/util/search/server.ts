import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../../prisma';
import { limit } from '.';
import { serialize, vehicleSelect } from '../data';

export const searchVehicles = unstable_cache(
  async (vin: string, cislo_tp: string, cislo_orv: string) => {
    const result = await prisma.registrations.findMany({
      where: {
        AND: [
          { key: 'vin', value: vin },
          { key: 'cislo_tp', value: cislo_tp },
          { key: 'cislo_orv', value: cislo_orv }
        ]
          .filter(({ value }) => value)
          .map(({ key, value }) => ({ [key]: { equals: value } }))
      },
      select: vehicleSelect,
      take: limit
    });
    return result.map(serialize<(typeof result)[0]>);
  },

  ['search'],
  { revalidate: 3600, tags: ['search'] }
);

export const queryDecoder = zod.object({
  vin: zod.string().default(''),
  cislo_tp: zod.string().default(''),
  cislo_orv: zod.string().default('')
});
