import type { DDiscover } from '../decoders';
import type { discoverVehicles } from './server';

export const defaultPageSize = 20;
export const maxPageSize = 100;

export const DateFormat = 'yyyy-MM-dd';

export type Pohon = 'electric' | 'hybrid' | '' | null;

export const stringToPohon = (val: string): Pohon =>
  val === 'hybrid' || val === 'electric' ? val : null;

export type Vehicles = Awaited<ReturnType<typeof discoverVehicles>>;

export type DiscoverParams = ReturnType<typeof DDiscover.parse>;

export type DiscoverProps = {
  currentPage: number;
  tovarni_znacka: string;
  typ: string;
  vehicles: Vehicles;
  datum_prvni_registrace_od: string | null;
  datum_prvni_registrace_do: string | null;
  pageSize: number;
  pohon: Pohon;
  imported: boolean;
  removed: boolean;
  rok_vyroby_od: number | null;
  rok_vyroby_do: number | null;
  palivo: string;
  error?: boolean;
};
