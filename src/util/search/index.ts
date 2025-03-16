import type { searchVehicles } from './server';

export type Vehicles = Awaited<ReturnType<typeof searchVehicles>>;

export type SearchProps = {
  vehicles: Vehicles;
  vin: string;
  cislo_tp: string;
};

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
