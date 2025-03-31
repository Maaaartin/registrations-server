import { Vehicles } from '../search';

export const pageSize = 20;

export const DateFormat = 'yyyy-MM-dd';

export type DiscoverProps = {
  currentPage: number;
  tovarni_znacka: string;
  typ: string;
  vehicles: Vehicles;
  datum_prvni_registrace_od: string | null;
  datum_prvni_registrace_do: string | null;
};
