'use server';
import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../prisma';

export const searchVehicles = unstable_cache(
  (vin: string, cislo_tp: string) =>
    prisma.registrations.findMany({
      where: {
        AND: [
          { key: 'vin', value: vin },
          { key: 'cislo_tp', value: cislo_tp }
        ]
          .filter(({ value }) => value)
          .map(({ key, value }) => ({ [key]: { equals: value } }))
      },
      select: {
        id: true,
        tovarni_znacka: true,
        typ: true,
        vin: true,
        cislo_tp: true
      }
    }),

  ['search'],
  { revalidate: 3600, tags: ['search'] }
);

export type Vehicles = Awaited<ReturnType<typeof searchVehicles>>;

export type SearchProps = {
  vehicles: Vehicles;
  vin: string;
  cislo_tp: string;
};

export const queryDecoder = zod.object({
  vin: zod.string().default(''),
  cislo_tp: zod.string().default('')
});

type FormState = { vin: string; cislo_tp: string };

type FormAction =
  | { type: 'update'; key: keyof FormState; value: FormState[keyof FormState] }
  | { type: 'clear' };

export const formReducer = (
  state: FormState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case 'update':
      return { ...state, [action.key]: action.value };
    case 'clear':
      return { vin: '', cislo_tp: '' };
    default:
      return state;
  }
};
