import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../../prisma';
import { useRouter } from 'next/router';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { DataGrid, GridSlotProps } from '@mui/x-data-grid';
import { unstable_cache } from 'next/cache';
import zod from 'zod';
import { GridBaseColDef } from '@mui/x-data-grid/internals';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';

type Vehicles = Awaited<ReturnType<typeof searchVehicles>>;
type Vehicle = Vehicles[0];

type Props = {
  vehicles: Vehicles;
  currentPage: number;
  brand: string;
  model: string;
  vin: string;
};

const pageSize = 20;

type RenderCellFn = GridBaseColDef<Vehicle>['renderCell'];

const LinkComponent = ({
  id,
  value
}: {
  id: number;
  value: Vehicle[keyof Vehicle];
}) => (
  <Link
    href={{
      pathname: '/vehicle',
      query: { id }
    }}
  >
    {value}
  </Link>
);

const renderCell: (field: keyof Vehicle) => RenderCellFn =
  (field) =>
  /* eslint-disable react/display-name */
  ({ row }) => <LinkComponent id={row.id} value={row[field]} />;

type ToolBarComponentProps = {
  loading: boolean;
  onSubmit: (
    params: Partial<{
      brand: string;
      model: string;
      vin: string;
      page: number;
    }>
  ) => Promise<boolean>;
};

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<Props, 'vehicles'> &
  ToolBarComponentProps;

const VinForm = ({
  vin = '',
  loading,
  onSubmit
}: { vin: string } & ToolBarComponentProps) => {
  const [value, setValue] = useState(vin);
  useEffect(() => {
    if (vin && !value) {
      onSubmit({ vin: '' });
    }
  }, [vin, value]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!value) return;
        onSubmit({ vin: value });
      }}
    >
      <TextField
        label="VIN"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setValue('')} edge="end">
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button type="submit" disabled={!value || loading}>
        Hledat
      </Button>
    </form>
  );
};

const Toolbar = ({ brand, model, vin, loading, onSubmit }: ToolbarProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <VinForm vin={vin} loading={loading} onSubmit={onSubmit} />
      <Divider orientation="vertical" variant="middle" flexItem />
      <BrandAutocomplete
        value={brand}
        onSelect={(value) => {
          onSubmit({ brand: value });
        }}
        disabled={loading}
      />
      <ModelAutocomplete
        brand={brand}
        model={model}
        onSelect={(value) => {
          onSubmit({ model: value });
        }}
        disabled={loading || !brand}
      />
    </Stack>
  );
};

export default function Search({
  vehicles,
  currentPage,
  brand,
  model,
  vin
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = ({
    brand: brandParam = brand,
    model: modelParam = model,
    page,
    vin: vinParam = vin
  }: Partial<{ brand: string; model: string; vin: string; page: number }>) => {
    setLoading(true);
    return router
      .push(
        {
          pathname: router.pathname,
          query: {
            brand: brandParam,
            model: brandParam ? modelParam : '',
            vin: vinParam,
            page:
              brandParam !== brand || modelParam !== model || vinParam !== vin
                ? 0
                : page
          }
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
      <DataGrid
        rowSelection={false}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer'
          },
          width: '100%'
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
            filterable: false
          },
          {
            field: 'model',
            headerName: 'Typ',
            flex: 0.5,
            minWidth: 300,
            renderCell: renderCell('typ'),
            sortable: false,
            filterable: false
          },
          {
            field: 'vin',
            headerName: 'VIN',
            flex: 0.5,
            minWidth: 150,
            renderCell: renderCell('vin'),
            sortable: false,
            filterable: false
          },
          {
            field: 'cislo_tp',
            headerName: 'Číslo TP',
            flex: 0.5,
            minWidth: 80,
            renderCell: renderCell('cislo_tp'),
            sortable: false,
            filterable: false
          }
        ]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: {
            paginationModel: { page: currentPage, pageSize },
            meta: { hasNextPage: true }
          }
        }}
        paginationModel={{ page: currentPage, pageSize }}
        paginationMode="server"
        filterMode="server"
        pageSizeOptions={[pageSize]}
        onPaginationModelChange={(params) => {
          return onSubmit({ page: params.page });
        }}
        rowCount={rowCount}
        loading={loading}
        disableColumnResize
        density="compact"
        slots={{
          toolbar: Toolbar as React.JSXElementConstructor<
            GridSlotProps['toolbar']
          >
        }}
        slotProps={{
          toolbar: {
            brand,
            model,
            currentPage,
            onSubmit,
            loading,
            vin
          } as ToolbarProps,
          filterPanel: {
            sx: { height: '100vh' },
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small'
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' }
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' }
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                  sx: { width: '100vh' }
                }
              }
            }
          }
        }}
      />
    </>
  );
}

const searchVehicles = unstable_cache(
  (page: number, brand: string, type: string, vin) =>
    prisma.registrations.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: vin
        ? { vin }
        : { tovarni_znacka: brand || undefined, typ: type || undefined },
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

const queryDecoder = zod.object({
  page: zod
    .string()
    .default('0')
    .transform((val) => Number(val) || 0),
  brand: zod.string().default(''),
  model: zod.string().default(''),
  vin: zod.string().default('')
});

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page, brand, model, vin } = queryDecoder.parse(context.query);

  const vehicles = await searchVehicles(page, brand, model, vin);

  return {
    props: {
      vehicles,
      currentPage: page,
      brand,
      model,
      vin
    }
  };
};
