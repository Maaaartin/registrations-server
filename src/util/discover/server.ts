import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../../prisma';
import { pageSize } from './index';
import { DBrandModel, DDate } from '../decoders';

export const discoverVehicles = unstable_cache(
  (
    page: number,
    tovarni_znacka: string,
    type: string,
    datum_prvni_registrace_od: Date | null,
    datum_prvni_registrace_do: Date | null
  ) => {
    const query = [
      {
        key: 'datum_1_registrace',
        value: { gte: datum_prvni_registrace_od }
      },
      {
        key: 'datum_1_registrace',
        value: { lte: datum_prvni_registrace_do }
      }
    ]
      .filter(({ value }) => Object.values(value).filter(Boolean).length)
      .map(({ key, value }) => ({ [key]: value }));

    return prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: {
        tovarni_znacka: tovarni_znacka || undefined,
        typ: type || undefined,
        AND: query
      },
      select: {
        id: true,
        tovarni_znacka: true,
        typ: true,
        vin: true,
        cislo_tp: true,
        cislo_orv: true
      }
    });
  },

  ['discover'],
  { revalidate: 3600, tags: ['discover'] }
);

export const queryDecoder = DBrandModel.extend({
  page: zod
    .string()
    .default('0')
    .transform((val) => Number(val) || 0),
  datum_prvni_registrace_od: DDate,
  datum_prvni_registrace_do: DDate
});
