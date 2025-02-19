import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from '../prisma';
import { useRouter } from 'next/router';
import BrandAutocomplete from '../internals/components/BrandAutocomplete';
import {
  SerializableRegistration,
  serializeRegistration,
} from '../util/registrations';
import ModelAutocomplete from '../internals/components/ModelAutocomplete';
import { DataGrid, GridFilterInputValueProps } from '@mui/x-data-grid';
import { unstable_cache } from 'next/cache';

type Props = {
  vehicles: SerializableRegistration[];
  currentPage: number | null;
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
        router.push(`/vehicle`, { query: { vin } });
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

  return (
    <div>
      <VinForm />
      <DataGrid
        onRowClick={(params) => {
          router.push({ pathname: '/vehicle', query: { id: params.row.id } }); // Navigate to vehicle details page
        }}
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
            renderCell: (params) => params.row.tovarni_znacka,
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
                      onSubmit(currentPage || 0)({ brand: value, model });
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
            renderCell: (params) => params.row.typ,
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
                      onSubmit(currentPage || 0)({ brand, model: value });
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
            renderCell: (params) => params.row.vin,
            sortable: false,
            filterable: false,
          },
          {
            field: 'cislo_tp',
            headerName: 'Číslo TP',
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => params.row.cislo_tp,
            sortable: false,
            filterable: false,
          },
        ]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: {
            paginationModel: { page: currentPage || 0, pageSize },
            meta: { hasNextPage: true },
          },
        }}
        paginationMode="server"
        filterMode="server"
        pageSizeOptions={[pageSize]}
        onPaginationModelChange={(params) => {
          return onSubmit(params.page)({ brand, model });
        }}
        rowCount={-1}
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
    </div>
  );
}

const searchVehicles = unstable_cache(
  (page: number, brand: string, type: string) =>
    prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: { tovarni_znacka: brand || undefined, typ: type || undefined },
    }),
  ['search'],
  { revalidate: 3600, tags: ['search'] }
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page, brand, model } = context.query;

  const currentPage = parseInt(page as string, 10) || 0;
  const brandStr = [brand].flat()[0] || '';
  const typStr = [model].flat()[0] || '';

  const vehicles = await searchVehicles(currentPage, brandStr, typStr);

  return {
    props: {
      vehicles: vehicles.map(serializeRegistration),
      currentPage,
      brand: brandStr,
      model: typStr,
    },
  };
};
