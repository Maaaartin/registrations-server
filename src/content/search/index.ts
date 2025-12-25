import type { searchVehicles } from './server';

export type Vehicles = Awaited<ReturnType<typeof searchVehicles>>;

export type SearchState = {
  vin: string;
  cislo_tp: string;
  cislo_orv: string;
  page?: number;
};

export type SearchProps = {
  vehicles: Vehicles;
} & SearchState;

type FormAction =
  | {
      type: 'update';
      key: keyof SearchState;
      value: SearchState[keyof SearchState];
    }
  | { type: 'clear' };

export const formReducer = (
  state: SearchState,
  action: FormAction
): SearchState => {
  switch (action.type) {
    case 'update':
      return { ...state, [action.key]: action.value };
    case 'clear':
      return { vin: '', cislo_tp: '', cislo_orv: '' };
    default:
      return state;
  }
};

export const limit = 100;
export const pageSize = 20;
