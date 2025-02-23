import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from '../prisma';
import { useRouter } from 'next/router';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { DataGrid, GridFilterInputValueProps } from '@mui/x-data-grid';
import { unstable_cache } from 'next/cache';
import zod from 'zod';
import { GridBaseColDef } from '@mui/x-data-grid/internals';
import Link from 'next/link';

type Vehicle = Awaited<ReturnType<typeof searchVehicles>>;

type Props = {
  vehicles: Vehicle;
  currentPage: number;
  brand: string;
  model: string;
};

const pageSize = 20;

function VinForm() {
  const router = useRouter();
  const [vin, setVin] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!vin) return;
        router.push({ pathname: `/vehicle`, query: { vin } });
      }}
    >
      <TextField
        label="Hledat VIN"
        value={vin}
        onChange={(e) => {
          setVin(e.target.value);
        }}
      ></TextField>
      <Button type="submit">Hledat</Button>
    </form>
  );
}
type RenderCellFn = GridBaseColDef<Vehicle[0]>['renderCell'];

const renderCell: (field: keyof Vehicle[0]) => RenderCellFn =
  (field) =>
  ({ row }) =>
    (
      <Link
        href={{
          pathname: '/vehicle',
          query: { id: row.id },
        }}
      >
        {row[field]}
      </Link>
    );

export default function Search({ vehicles, currentPage, brand, model }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit =
    (page: number) => (params: Partial<{ brand: string; model: string }>) => {
      setLoading(true);
      return router
        .push(
          {
            pathname: router.pathname,
            query: {
              ...params,
              page: params.brand !== brand || params.model !== model ? 0 : page,
            },
          },
          undefined,
          { scroll: false }
        )
        .finally(() => {
          setLoading(false);
        });
    };
  const rowCount =
    vehicles.length < pageSize ? (currentPage + 1) * pageSize : -1;

  return (
    <>
      <VinForm />
      <DataGrid
        rowSelection={false}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
          width: '100%',
        }}
        rows={vehicles}
        columns={[
          {
            field: 'brand',
            headerName: 'Tovární značka',
            flex: 0.5,
            minWidth: 200,
            renderCell: renderCell('tovarni_znacka'),
            sortable: false,
            filterOperators: [
              {
                label: 'Contains',
                value: 'contains',
                getApplyFilterFn: () => {
                  return null;
                },
                InputComponent: ({
                  item,
                  applyValue,
                }: GridFilterInputValueProps) => (
                  <BrandAutocomplete
                    value={brand}
                    onSelect={(value) => {
                      applyValue({ ...item, value });
                      onSubmit(currentPage)({ brand: value, model });
                    }}
                    disabled={loading}
                  />
                ),
              },
            ],
          },
          {
            field: 'model',
            headerName: 'Typ',
            flex: 0.5,
            minWidth: 300,
            renderCell: renderCell('typ'),
            sortable: false,
            filterOperators: [
              {
                label: 'Contains',
                value: 'contains',
                getApplyFilterFn: () => {
                  return null;
                },
                InputComponent: ({
                  item,
                  applyValue,
                }: GridFilterInputValueProps) => (
                  <ModelAutocomplete
                    brand={brand}
                    model={model}
                    onSelect={(value) => {
                      applyValue({ ...item, value });
                      onSubmit(currentPage)({ brand, model: value });
                    }}
                    disabled={loading}
                  />
                ),
              },
            ],
          },
          {
            field: 'vin',
            headerName: 'VIN',
            flex: 0.5,
            minWidth: 150,
            renderCell: renderCell('vin'),
            sortable: false,
            filterable: false,
          },
          {
            field: 'cislo_tp',
            headerName: 'Číslo TP',
            flex: 0.5,
            minWidth: 80,
            renderCell: renderCell('cislo_tp'),
            sortable: false,
            filterable: false,
          },
        ]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: {
            paginationModel: { page: currentPage, pageSize },
            meta: { hasNextPage: true },
          },
        }}
        paginationModel={{ page: currentPage, pageSize }}
        paginationMode="server"
        filterMode="server"
        pageSizeOptions={[pageSize]}
        onPaginationModelChange={(params) => {
          return onSubmit(params.page)({ brand, model });
        }}
        rowCount={rowCount}
        loading={loading}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            sx: { height: '100vh' },
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { width: '100vh' },
                },
              },
            },
          },
        }}
      />
    </>
  );
}

const searchVehicles = unstable_cache(
  (page: number, brand: string, type: string) =>
    prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: { tovarni_znacka: brand || undefined, typ: type || undefined },
      select: {
        id: true,
        tovarni_znacka: true,
        typ: true,
        vin: true,
        cislo_tp: true,
      },
    }),

  ['search'],
  { revalidate: 3600, tags: ['search'] }
);

const queryDecoder = zod.object({
  page: zod
    .string()
    .default('0')
    .transform((val) => Number(val) || 0),
  brand: zod.string().default(''),
  model: zod.string().default(''),
});

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page, brand, model } = queryDecoder.parse(context.query);

  const vehicles = await searchVehicles(page, brand, model);

  return {
    props: {
      vehicles,
      currentPage: page,
      brand,
      model,
    },
  };
};
