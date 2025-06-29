import { z } from 'zod';
import prisma from '../../../prisma';
import { serialize } from '../data';
import { withCache } from '../../redis';

export async function getVehicle(id: number) {
  const result = await prisma.registrations.findFirst({
    where: { id }
  });
  return result ? serialize(result) : null;
}

const omit = { id: true, pcv: true } as const;

export const getImportFromPcv = (pcv: number | null) => {
  if (pcv == null) return null;
  return withCache(async () => {
    const result = await prisma.imports.findFirst({
      where: { pcv },
      omit
    });
    return result ? serialize(result) : null;
  }, 'importFromPcv' + pcv);
};

export type VehicleImportFromPcv = Exclude<
  Awaited<ReturnType<typeof getImportFromPcv>>,
  null
>;

export const getInspectionsFromPcv = (pcv: number | null) => {
  if (pcv == null) return [];
  return withCache(async () => {
    const result = await prisma.inspections.findMany({
      where: { pcv },
      omit: { ...omit, aktualni: true },
      orderBy: { platnost_do: 'asc' }
    });
    return result.map(serialize);
  }, 'inspectionsFromPcv' + pcv);
};

export type VehicleInspectionFromPcv = Awaited<
  ReturnType<typeof getInspectionsFromPcv>
>[0];

export const getVehicleRemoval = (pcv: number | null) => {
  if (pcv == null) return null;
  return withCache(async () => {
    const result = await prisma.removed_vehicles.findFirst({
      where: { pcv },
      omit
    });
    return result ? serialize(result) : null;
  }, 'vehicleRemoval' + pcv);
};

export type VehicleRemovalFromPcv = Exclude<
  Awaited<ReturnType<typeof getVehicleRemoval>>,
  null
>;

export const getVehicleOwnerFromPcv = async (pcv: number | null) => {
  if (pcv == null) return [];
  return withCache(async () => {
    const result = await prisma.owners.findMany({
      where: { pcv },
      omit: { ...omit, aktualni: true },
      orderBy: { datum_do: 'asc' }
    });
    return result.map(serialize);
  }, 'vehicleOwnerFromPcv' + pcv);
};

export type VehicleOwnerFromPcv = Awaited<
  ReturnType<typeof getVehicleOwnerFromPcv>
>[0];

export function getVehicleEquipmentFromPcv(pcv: number | null) {
  if (pcv == null) return [];
  return withCache(async () => {
    const result = await prisma.equipment.findMany({
      where: { pcv },
      omit: { ...omit, datum_do: true, datum_od: true },
      orderBy: { datum_do: 'asc' }
    });
    return result.map(serialize);
  }, 'vehicleEquipmentFromPcv' + pcv);
}

export type VehicleEquipmentFromPcv = Awaited<
  ReturnType<typeof getVehicleEquipmentFromPcv>
>[0];
