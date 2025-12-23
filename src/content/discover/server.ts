import { z } from 'zod';
import { defaultPageSize, DiscoverParams, maxPageSize } from './index';
import { serialize, vehicleSelect } from '../data';
import { DiscoverVehiclesParams } from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';
import prisma from '../../../prisma';
import { withCache } from '../../redis';
import { discoverMvCount, discoverMvSearch } from '../../../prisma/client/sql';

const parseDiscoverParams = ({
  tovarni_znacka,
  typ,
  removed,
  imported,
  pohon,
  datum_prvni_registrace_do,
  datum_prvni_registrace_od,
  rok_vyroby_do,
  rok_vyroby_od,
  palivo
}: DiscoverParams) => {
  return [
    tovarni_znacka || null,
    typ || null,
    datum_prvni_registrace_od || null,
    datum_prvni_registrace_do || null,
    rok_vyroby_od || null,
    rok_vyroby_do || null,
    pohon === 'electric',
    pohon === 'hybrid',
    imported,
    removed,
    palivo || null
  ] as const;
};

export const discoverVehicles = (params: DiscoverVehiclesParams) =>
  withCache(
    async () => {
      const { page, pageSize, ...rest } = params;
      const result = await prisma.$queryRawTyped(
        discoverMvSearch(
          pageSize,
          page * pageSize,
          ...parseDiscoverParams(rest)
        )
      );
      const vehicles = await prisma.registrations.findMany({
        select: vehicleSelect,
        where: { id: { in: result.map((row) => row.id) as number[] } }
      });
      return vehicles.map(serialize);
    },
    'discover' + JSON.stringify(params)
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

export const queryDecoder = z.object({
  ...DDiscover.shape,
  ...DPage.shape,
  ...pageSizeDecoder.shape
});

export const fetchCount = async (params: DiscoverParams) =>
  withCache(
    async () => {
      const [{ count }] = await prisma.$queryRawTyped(
        discoverMvCount(...parseDiscoverParams(params))
      );
      return Number(count);
    },
    'discoverCount' + JSON.stringify(params)
  );
