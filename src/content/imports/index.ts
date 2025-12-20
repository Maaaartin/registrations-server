import type { VehiclesWithImportData } from './server';

export const pageSize = 10;

export type ImportsProps = {
  vehiclesWithImports: VehiclesWithImportData;
  page: number;
  country: string;
  tovarni_znacka: string;
  typ: string;
  error?: boolean;
};
