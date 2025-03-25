import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../../prisma';
import { pageSize } from './index';
import { DBrandModel, DDate, DPage } from '../decoders';
import { vehicleSelect } from '../data';

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
      select: vehicleSelect
    });
  },

  ['discover'],
  { revalidate: 3600, tags: ['discover'] }
);

export const queryDecoder = zod
  .object({
    datum_prvni_registrace_od: DDate,
    datum_prvni_registrace_do: DDate
  })
  .merge(DBrandModel)
  .merge(DPage);
