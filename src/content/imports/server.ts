import zod from 'zod';
import { DPage, DStringDefault } from '../decoders';
import { unstable_cache } from 'next/cache';
import prisma from '../../../prisma';
import { importsWithMatchingVehicle } from '../../../prisma/client/sql';
import { serialize, vehicleSelect } from '../data';
import { pageSize } from '.';

export const queryDecoder = zod
  .object({
    country: DStringDefault
  })
  .merge(DPage);

export const searchImports = unstable_cache(
  async (page: number, importCountry: string) => {
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
  },
  ['imports'],
  { revalidate: 3600, tags: ['imports'] }
);

export type VehiclesWithImportData = Awaited<ReturnType<typeof searchImports>>;
