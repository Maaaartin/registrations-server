import { z } from 'zod';
import queries from '../../../prisma/client/sql';
import { defaultPageSize, maxPageSize } from './index';
import { serialize } from '../data';
import {
  DiscoverVehiclesParams,
  transaction,
  withCache
} from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';

export const discoverVehicles = (params: DiscoverVehiclesParams) =>
  withCache(
    () =>
      transaction(
        async (tx) => {
          const {
            page,
            pageSize,
            tovarni_znacka,
            typ,
            datum_prvni_registrace_od,
            datum_prvni_registrace_do,
            pohon,
            imported,
            removed,
            rok_vyroby_od,
            rok_vyroby_do
          } = params;
          const result = await tx.$queryRawTyped(
            queries.discoverVehicles(
              tovarni_znacka || null,
              typ || null,
              datum_prvni_registrace_od || null,
              datum_prvni_registrace_do || null,
              rok_vyroby_od || null,
              rok_vyroby_do || null,
              pohon === 'electric' || null,
              pohon === 'hybrid' || null,
              imported || null,
              removed || null,
              pageSize,
              pageSize * page
            )
          );
          return result.map(serialize);
        },
        null,
        60000
      ),
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

export const queryDecoder = DDiscover.merge(DPage).merge(pageSizeDecoder);
