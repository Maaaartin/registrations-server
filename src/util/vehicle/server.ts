import zod from 'zod';
import prisma from '../../../prisma';
import { serialize } from '../data';

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
  return result ? serialize(result) : null;
}

export async function getImportFromPcv(pcv: number | null) {
  if (pcv == null) return null;
  const result = await prisma.imports.findFirst({
    where: { pcv }
  });
  return result ? serialize(result) : null;
}

export async function getInspectionsFromPcv(pcv: number | null) {
  if (pcv == null) return [];
  const result = await prisma.inspections.findMany({
    where: { pcv }
  });
  return result.map(serialize);
}
