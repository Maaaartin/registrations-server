import { z } from 'zod';
import prisma from '../../../prisma';
import { serialize } from '../data';
import { unstable_cache } from 'next/cache';

export const queryDecoder = z.object({
  id: z
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

const omit = { id: true, pcv: true } as const;

export const getImportFromPcv = unstable_cache(async (pcv: number | null) => {
  if (pcv == null) return null;
  const result = await prisma.imports.findFirst({
    where: { pcv },
    omit
  });
  return result ? serialize(result) : null;
});

export type VehicleImportFromPcv = Exclude<
  Awaited<ReturnType<typeof getImportFromPcv>>,
  null
>;

export const getInspectionsFromPcv = unstable_cache(async function (
  pcv: number | null
) {
  if (pcv == null) return [];
  const result = await prisma.inspections.findMany({
    where: { pcv },
    omit: { ...omit, aktualni: true },
    orderBy: { platnost_do: 'asc' }
  });
  return result.map(serialize);
});

export type VehicleInspectionFromPcv = Awaited<
  ReturnType<typeof getInspectionsFromPcv>
>[0];

export const getVehicleRemoval = unstable_cache(async function (
  pcv: number | null
) {
  if (pcv == null) return null;
  const result = await prisma.removed_vehicles.findFirst({
    where: { pcv },
    omit
  });
  return result ? serialize(result) : null;
});

export type VehicleRemovalFromPcv = Exclude<
  Awaited<ReturnType<typeof getVehicleRemoval>>,
  null
>;

export const getVehicleOwnerFromPcv = unstable_cache(async function (
  pcv: number | null
) {
  if (pcv == null) return [];
  const result = await prisma.owners.findMany({
    where: { pcv },
    omit: { ...omit, aktualni: true },
    orderBy: { datum_do: 'asc' }
  });
  return result.map(serialize);
});

export type VehicleOwnerFromPcv = Awaited<
  ReturnType<typeof getVehicleOwnerFromPcv>
>[0];

export async function getVehicleEquipmentFromPcv(pcv: number | null) {
  if (pcv == null) return [];
  const result = await prisma.equipment.findMany({
    where: { pcv },
    omit: { ...omit, datum_do: true, datum_od: true },
    orderBy: { datum_do: 'asc' }
  });
  return result.map(serialize);
}

export type VehicleEquipmentFromPcv = Awaited<
  ReturnType<typeof getVehicleEquipmentFromPcv>
>[0];
