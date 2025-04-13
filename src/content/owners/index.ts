import type { VehiclesPerOwner } from './server';

export type OwnersParams = {
  ico: string;
};

export type OwnersProps = OwnersParams & {
  vehicles: VehiclesPerOwner;
};
