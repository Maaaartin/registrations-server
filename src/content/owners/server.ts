import { z } from 'zod';
import { OwnersParams } from '.';
import { serialize, vehicleSelect } from '../data';
import { uniq } from 'ramda';
import { withCache } from '../../../prisma/queries';

export const getVehiclesAndOwnerFromIco = async ({ ico }: OwnersParams) => {
  return withCache(async (prisma) => {
    const ownersResult = await prisma.owners.findMany({
      where: { ico, pcv: { not: null } },
      select: { pcv: true }
    });
    if (!ownersResult.length) {
      return { owners: 0, registrations: [] };
    }
    const pcvList = uniq(ownersResult.map((o) => o.pcv)) as bigint[];
    const registrations = await prisma.registrations.findMany({
      where: {
        pcv: { in: pcvList }
      },
      select: vehicleSelect
    });
    return {
      owners: ownersResult.length,
      registrations: registrations.map(serialize)
    };
  }, 'owners' + ico);
};

export type VehiclesPerOwner = Awaited<
  ReturnType<typeof getVehiclesAndOwnerFromIco>
>['registrations'];

export const queryDecoder = z.object({
  ico: z.string().default('')
});
