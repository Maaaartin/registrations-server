import zod from 'zod';
import prisma from '../../../prisma';
import { serializeRegistration } from '../../util/registrations';

export const queryDecoder = zod.object({
  id: zod
    .string()
    .default('')
    .transform((value) => parseInt(value))
});

export async function getVehicle(id: number) {
  const result = await prisma.registrations.findFirst({
    where: { id }
  });
  return result ? serializeRegistration(result) : null;
}
