import { z } from 'zod';
import { defaultPageSize, maxPageSize } from './index';
import { MAX_COUNT, serialize, vehicleSelect } from '../data';
import { DiscoverVehiclesParams } from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';
import prisma from '../../../prisma';
import { Prisma } from '../../../prisma/client';
import { withCache } from '../../redis';
import { discoverMvCount, discoverMvSearch } from '../../../prisma/client/sql';

export const buildDiscoverWhere = ({
  tovarni_znacka,
  typ,
  datum_prvni_registrace_do,
  datum_prvni_registrace_od,
  rok_vyroby_do,
  rok_vyroby_od,
  pohon,
  removed,
  imported
}: DiscoverVehiclesParams) => {
  const whereParts: Prisma.Sql[] = [];

  if (tovarni_znacka) {
    whereParts.push(Prisma.sql`r.tovarni_znacka = ${tovarni_znacka}`);
  }

  if (typ) {
    whereParts.push(Prisma.sql`r.obchodni_oznaceni = ${typ}`);
  }

  if (datum_prvni_registrace_od) {
    whereParts.push(
      Prisma.sql`r.datum_1_registrace >= ${datum_prvni_registrace_od}`
    );
  }

  if (datum_prvni_registrace_do) {
    whereParts.push(
      Prisma.sql`r.datum_1_registrace <= ${datum_prvni_registrace_do}`
    );
  }

  if (rok_vyroby_od) {
    whereParts.push(Prisma.sql`r.rok_vyroby >= ${rok_vyroby_od}`);
  }

  if (rok_vyroby_do) {
    whereParts.push(Prisma.sql`r.rok_vyroby <= ${rok_vyroby_do}`);
  }

  if (pohon === 'electric') {
    whereParts.push(Prisma.sql`r.plne_elektricke_vozidlo = TRUE`);
  }

  if (pohon === 'hybrid') {
    whereParts.push(Prisma.sql`r.hybridni_vozidlo = TRUE`);
  }

  if (imported) {
    whereParts.push(
      Prisma.sql`EXISTS (SELECT 1 FROM imports i WHERE i.pcv = r.pcv)`
    );
  }

  if (removed) {
    whereParts.push(
      Prisma.sql`EXISTS (SELECT 1 FROM removed_vehicles rv WHERE rv.pcv = r.pcv)`
    );
  }

  return whereParts.length
    ? Prisma.sql`WHERE ${Prisma.join(whereParts, ' AND ')}`
    : Prisma.sql``;
};

type DiscoverRow = Prisma.registrationsGetPayload<{
  select: typeof vehicleSelect;
}>;

export const discoverVehicles = (params: DiscoverVehiclesParams) => {
  const {
    page,
    pageSize,
    tovarni_znacka,
    typ,
    removed,
    imported,
    pohon,
    datum_prvni_registrace_do,
    datum_prvni_registrace_od,
    rok_vyroby_do,
    rok_vyroby_od
  } = params;
  return withCache(
    async () => {
      const result = await prisma.$queryRawTyped(
        discoverMvSearch(
          pageSize,
          page * pageSize,
          tovarni_znacka || null,
          typ || null,
          datum_prvni_registrace_od || null,
          datum_prvni_registrace_do || null,
          rok_vyroby_od || null,
          rok_vyroby_do || null,
          pohon === 'electric',
          pohon === 'hybrid',
          imported,
          removed
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
};

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

type Params = ReturnType<typeof DDiscover.parse>;

export const fetchCount = async (params: Params, withLimit = true) =>
  withCache(
    async () => {
      withLimit = false;
      const {
        tovarni_znacka,
        typ,
        rok_vyroby_do,
        rok_vyroby_od,
        datum_prvni_registrace_do,
        datum_prvni_registrace_od,
        imported,
        removed,
        pohon
      } = params;
      const [{ count }] = await prisma.$queryRawTyped(
        discoverMvCount(
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
          withLimit ? MAX_COUNT : null
        )
      );

      const numericCount = Number(count);
      return withLimit ? Math.min(numericCount, MAX_COUNT) : numericCount;
    },
    'discoverCount' + JSON.stringify(params) + String(withLimit)
  );
