import { GetServerSideProps } from 'next';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { CellParams, Props, mapVehicle } from '../util/vehicle';
import { getVehicle, queryDecoder } from '../util/vehicle/server';
import { gridLocaleText } from '../util/localization';

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
  const mapped = mapVehicle(vehicle);
  return (
    <>
      <h1>
        {vehicle.tovarni_znacka}, {vehicle.typ} ({vehicle.vin})
      </h1>
      <DataGrid
        localeText={gridLocaleText}
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
  const { id } = queryDecoder.parse(query);
  if (!id) return { notFound: true };
  const vehicle = await getVehicle(id);
  if (!vehicle) return { notFound: true };

  return { props: { vehicle } };
};
