import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import {
  SerializableRegistration,
  serializeRegistration
} from '../util/registrations';
import type { registrations } from '../../prisma/client';
import registrationColumnMap from '../registrationColumnMap.json';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';

type Props = { vehicle: SerializableRegistration | null };

function mapVehicle(vehicle: SerializableRegistration): {
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
type CellParams = GridRenderCellParams<ReturnType<typeof mapVehicle>[0]>;

function AttributeCell({ row: { id, description } }: CellParams) {
  if (description) {
    return (
      <Tooltip title={description}>
        <span>{id} *</span>
      </Tooltip>
    );
  }
  return id;
}

function ValueCell({ row: { value } }: CellParams) {
  if (typeof value === 'object' && value?.value) {
    return new Date(value.value).toLocaleDateString();
  }
  if (typeof value === 'boolean') {
    return value ? 'Ano' : 'Ne';
  }
  return String(value);
}

/* eslint-disable react-hooks/rules-of-hooks */
export default function Page({ vehicle }: Props) {
  if (!vehicle) return 'Nenalezeno';
  const mapped = mapVehicle(vehicle);

  return (
    <>
      <h1>VIN {vehicle.vin}</h1>
      <DataGrid
        rowSelection={false}
        rows={mapped}
        columns={[
          {
            field: 'attribute',
            headerName: 'Atribut',
            flex: 0.5,
            minWidth: 200,
            renderCell: AttributeCell,
            sortable: true
          },
          {
            field: 'value',
            headerName: 'Hodnota',
            flex: 0.5,
            minWidth: 300,
            renderCell: ValueCell,
            sortable: false
          }
        ]}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query
}) => {
  const vin = [query.vin].flat()[0];
  const id = parseInt([query.id].flat()[0] || '');
  let result: registrations | null = null;
  if (vin) {
    result = await prisma.registrations.findFirst({
      where: { vin }
    });
  }
  if (id) {
    result = await prisma.registrations.findFirst({
      where: { id }
    });
  }

  return { props: { vehicle: result ? serializeRegistration(result) : null } };
};
