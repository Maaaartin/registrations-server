import zod from 'zod';
import prisma from '../../../prisma';
import { serialize } from '../data';
import type { registrations } from '../../../prisma/client';

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
  return result ? serialize<registrations>(result) : null;
}
