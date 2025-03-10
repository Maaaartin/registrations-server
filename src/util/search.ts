import { unstable_cache } from 'next/cache';
import zod from 'zod';
import prisma from '../../prisma';
import { DBrandModel } from './decoders';

export const pageSize = 20;

export const searchVehicles = unstable_cache(
  (
    page: number,
    tovarni_znacka: string,
    type: string,
    vin: string,
    cislo_tp: string
  ) =>
    prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where:
        vin || cislo_tp
          ? {
              OR: [{ vin: { equals: vin } }, { cislo_tp: { equals: cislo_tp } }]
            }
          : {
              tovarni_znacka: tovarni_znacka || undefined,
              typ: type || undefined
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
type Vehicles = Awaited<ReturnType<typeof searchVehicles>>;

export type SearchProps = {
  vehicles: Vehicles;
  currentPage: number;
  tovarni_znacka: string;
  typ: string;
  vin: string;
  cislo_tp: string;
};

export const queryDecoder = DBrandModel.extend({
  page: zod
    .string()
    .default('0')
    .transform((val) => Number(val) || 0),
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
