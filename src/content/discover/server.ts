import { z } from 'zod';
import { defaultPageSize, maxPageSize } from './index';
import { serialize, vehicleSelect } from '../data';
import { DiscoverVehiclesParams } from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';
import prisma from '../../../prisma';
import { Prisma } from '../../../prisma/client';
import { withCache } from '../../redis';

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
    const brand = `${tovarni_znacka}%`;
    whereParts.push(Prisma.sql`r.tovarni_znacka ILIKE ${brand}`);
  }

  if (typ) {
    const tradeName = `${typ}%`;
    whereParts.push(Prisma.sql`r.obchodni_oznaceni ILIKE ${tradeName}`);
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
  return withCache(
    async () => {
      const whereClause = buildDiscoverWhere(params);

      const vehicles = await prisma.$queryRaw<DiscoverRow[]>(Prisma.sql`
        WITH filtered AS (
          SELECT r.id
          FROM registrations r
          ${whereClause}
          ORDER BY r.id ASC
          LIMIT ${params.pageSize}
          OFFSET ${params.pageSize * params.page}
        )
        SELECT r.id,
               r.tovarni_znacka,
               r.obchodni_oznaceni,
               r.vin,
               r.cislo_tp,
               r.cislo_orv,
               r.pcv
        FROM registrations r
        INNER JOIN filtered f ON f.id = r.id
        ORDER BY r.id ASC
      `);

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
