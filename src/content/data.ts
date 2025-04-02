import { DateObjectUnits, DateTime } from 'luxon';

export type Serialized<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Date | null
    ? DateObjectUnits | null
    : T[K] extends bigint | null
      ? number | null
      : T[K] extends undefined
        ? null
        : T[K];
};

export function serialize<T extends Record<string, unknown>>(
  obj: T
): Serialized<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      return [
        key,
        value instanceof Date
          ? DateTime.fromJSDate(value).startOf('day').toObject()
          : typeof value === 'bigint'
            ? Number(value)
            : (value ?? null)
      ];
    })
  ) as Serialized<T>;
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

export function toTypedEntries<T extends Record<string, unknown>>(object: T) {
  return Object.entries(object) as [keyof T, T[keyof T]][];
}

export function filterQuery<T>(
  entries: [string, T | null | undefined][]
): Record<string, NonNullable<T>> {
  return Object.fromEntries(
    entries.filter(
      (entry): entry is [string, NonNullable<T>] =>
        entry[1] !== '' && entry[1] !== null && entry[1] !== undefined
    )
  );
}
