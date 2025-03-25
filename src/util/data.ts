import type { registrations } from '../../prisma/client';

export type Serializable<T> = {
  [K in keyof T]: T[K] extends Date | null
    ? { type: 'Date'; value: string } | null
    : T[K];
};

export type SerializableRegistration = Serializable<registrations>;

export function serialize<T>(vehicle: object): Serializable<T> {
  return Object.fromEntries(
    Object.entries(vehicle).map(([key, value]) => {
      return [
        key,
        value instanceof Date
          ? { type: 'Date', value: value.toISOString() }
          : typeof value === 'bigint'
            ? Number(value)
            : value
      ];
    })
  ) as Serializable<T>;
}

export type ValueCountPair = { value: string; count: number };
export type ValueCountPairs = ValueCountPair[];

export const vehicleSelect = {
  id: true,
  tovarni_znacka: true,
  typ: true,
  vin: true,
  cislo_tp: true,
  cislo_orv: true,
  pcv: true
} as const;
