import { GetServerSideProps } from 'next';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { CellParams, Props, mapVehicle } from '../util/vehicle';
import { getVehicle, queryDecoder } from '../util/vehicle/server';
import { notFound } from 'next/navigation';

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
  if (!vehicle) notFound();
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
  const { id } = queryDecoder.parse(query);
  if (!id) return { notFound: true };
  const vehicle = await getVehicle(id);
  if (!vehicle) return { notFound: true };

  return { props: { vehicle } };
};
