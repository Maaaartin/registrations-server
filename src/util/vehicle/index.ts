import type { registrations } from '../../../prisma/client';
import { SerializableRegistration } from '../registrations';
import registrationColumnMap from '../../registrationColumnMap.json';
import type { GridRenderCellParams } from '@mui/x-data-grid';

export type Props = { vehicle: SerializableRegistration };

export function mapVehicle(vehicle: SerializableRegistration): {
  id: string;
  value: SerializableRegistration[keyof SerializableRegistration];
  description: string | null;
}[] {
  const excludeFields: (keyof registrations)[] = [
    'id',
    'max_vykon',
    'max_vykon_otacky',
    'naprav_pohanenych',
    'kola_a_pneumatiky_naprava_1',
    'kola_a_pneumatiky_naprava_2',
    'kola_a_pneumatiky_naprava_3',
    'kola_a_pneumatiky_naprava_4'
  ];

  const filteredEntries = Object.fromEntries(
    Object.entries(vehicle).filter(([key]) => {
      return !excludeFields.includes(key as keyof registrations);
    })
  );
  (filteredEntries as Record<string, string>).max_vykon =
    `${vehicle.max_vykon} / ${vehicle.max_vykon_otacky}`;
  (filteredEntries as Record<string, string>).pocet_naprav =
    `${vehicle.pocet_naprav} / ${vehicle.naprav_pohanenych}`;
  (filteredEntries as Record<string, string>).kola_a_pneumatiky = [
    vehicle.kola_a_pneumatiky_naprava_1,
    vehicle.kola_a_pneumatiky_naprava_2,
    vehicle.kola_a_pneumatiky_naprava_3,
    vehicle.kola_a_pneumatiky_naprava_4
  ].join('; ');
  return Object.entries(filteredEntries).map(([key, value]) => {
    const typed = registrationColumnMap as Record<
      string,
      Record<string, string>
    >;
    return {
      id: typed[key]?.name || key,
      description: typed[key]?.description || null,
      value
    };
  });
}
export type CellParams = GridRenderCellParams<ReturnType<typeof mapVehicle>[0]>;
