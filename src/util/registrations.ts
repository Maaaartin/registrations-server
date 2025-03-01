import type { registrations } from '../../prisma/client';

type ConvertDatesToString<T> = {
  [K in keyof T]: T[K] extends Date | null
    ? { type: 'Date'; value: string } | null
    : T[K];
};

export type SerializableRegistration = ConvertDatesToString<registrations>;

export function serializeRegistration(
  vehicle: registrations
): SerializableRegistration {
  return Object.fromEntries(
    Object.entries(vehicle).map(([key, value]) => {
      return [
        key,
        value instanceof Date
          ? { type: 'Date', value: value.toISOString() }
          : value
      ];
    })
  ) as SerializableRegistration;
}
