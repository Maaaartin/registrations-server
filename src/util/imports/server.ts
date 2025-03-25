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
    const imports = await prisma.$queryRawTyped(
      importsWithMatchingVehicle(
        pageSize,
        page * pageSize,
        importCountry || null
      )
    );
    const vehicles = await prisma.registrations.findMany({
      select: vehicleSelect,
      where: {
        pcv: { in: imports.map((i) => i.pcv) as bigint[] }
      },
      take: imports.length
    });
    const vehiclesWithImports = vehicles.map((vehicle) => {
      const matchingImport = imports.find((i) => i.pcv === vehicle.pcv);
      return {
        ...vehicle,
        import_country: matchingImport?.country,
        import_date: matchingImport?.import_date
      };
    });
    return vehiclesWithImports.map(serialize<(typeof vehiclesWithImports)[0]>);
  },

  ['import'],
  { revalidate: 3600, tags: ['import'] }
);

export type VehiclesWithImportData = Awaited<ReturnType<typeof searchImports>>;
