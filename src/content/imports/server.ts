import { z } from 'zod';
import { DPage, DStringDefault } from '../decoders';
import { importsWithMatchingVehicle } from '../../../prisma/client/sql';
import { serialize, vehicleSelect } from '../data';
import { pageSize } from '.';
import { withCache } from '../../../prisma/queries';

export const queryDecoder = z
  .object({
    country: DStringDefault
  })
  .merge(DPage);

export const searchImports = (page: number, importCountry: string) =>
  withCache(async (prisma) => {
    const result = await prisma.$queryRawTyped(
      importsWithMatchingVehicle(
        pageSize,
        page * pageSize,
        importCountry || null
      )
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
  }, `search${page}${importCountry}`);

export type VehiclesWithImportData = Awaited<ReturnType<typeof searchImports>>;
