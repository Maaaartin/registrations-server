export type Serialized<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] extends Date | null
    ? { type: 'Date'; value: string } | null
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
          ? { type: 'Date', value: value.toISOString() }
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
