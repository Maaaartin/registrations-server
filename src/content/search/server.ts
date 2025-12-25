import { z } from 'zod';
import { pageSize } from '.';
import { serialize, vehicleSelect } from '../data';
import { withCache } from '../../redis';
import prisma from '../../../prisma';
import { DPage } from '../decoders';

export const searchVehicles = (
  vin: string,
  cislo_tp: string,
  cislo_orv: string,
  page: number
) =>
  withCache(
    async () => {
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
        take: pageSize,
        skip: pageSize * page
      });
      return result.map(serialize);
    },
    'search' + vin + cislo_orv + cislo_tp + page + pageSize
  );

export const queryDecoder = z.object({
  vin: z.string().default(''),
  cislo_tp: z.string().default(''),
  cislo_orv: z.string().default(''),
  ...DPage.shape
});
