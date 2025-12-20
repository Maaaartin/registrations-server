import { z } from 'zod';
import { DBrandModel, DPage, DStringDefault } from '../decoders';
import { importsWithMatchingVehicle } from '../../../prisma/client/sql';
import { serialize, vehicleSelect } from '../data';
import { pageSize } from '.';
import { withCache } from '../../redis';
import prisma from '../../../prisma';

export const queryDecoder = z.object({
  ...DPage.shape,
  ...DBrandModel.shape,
  country: DStringDefault
});

export const searchImports = (
  page: number,
  importCountry: string,
  tovarni_znacka: string,
  typ: string
) =>
  withCache(async () => {
    const [, result] = await prisma.$transaction(
      [
        prisma.$executeRaw`SET LOCAL statement_timeout = '10s'`,
        prisma.$queryRawTyped(
          importsWithMatchingVehicle(
            pageSize,
            page * pageSize,
            importCountry || null,
            tovarni_znacka || null,
            typ || null
          )
        )
      ],
      { isolationLevel: 'ReadCommitted' }
    );

    const importsIds = result
      .filter((row) => row.source === 'imports')
      .map((row) => row.id);
    const registrationsIds = result
      .filter((row) => row.source === 'registrations')
      .map((row) => row.id);
    const [vehicles, imports] = await Promise.all([
      prisma.registrations.findMany({
        select: vehicleSelect,
        where: {
          id: { in: registrationsIds as number[] }
        }
      }),
      prisma.imports.findMany({ where: { id: { in: importsIds as number[] } } })
    ]);
    const vehiclesWithImports = vehicles.map((vehicle) => {
      const matchingImport = imports.find((i) => i.pcv === vehicle.pcv);

      return {
        ...vehicle,
        import_country: matchingImport?.country,
        import_date: matchingImport?.import_date
      };
    });
    return vehiclesWithImports.map(serialize);
  }, `search${page}${importCountry}${tovarni_znacka}${typ}`);

export type VehiclesWithImportData = Awaited<ReturnType<typeof searchImports>>;
