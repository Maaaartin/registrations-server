import { Button, Divider, Stack, TextField } from '@mui/material';
import { useReducer, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { DataGrid, GridSlotProps } from '@mui/x-data-grid';
import {
  searchVehicles,
  pageSize,
  SearchProps,
  queryDecoder,
  formReducer
} from '../util/search';

type ToolBarComponentProps = {
  loading: boolean;
  onSubmit: (
    params: Partial<{
      tovarni_znacka: string;
      typ: string;
      vin: string;
      cislo_tp: string;
      page: number;
    }>
  ) => Promise<boolean>;
};

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<SearchProps, 'vehicles'> &
  ToolBarComponentProps;

const VinForm = ({
  vin = '',
  cislo_tp = '',
  loading,
  onSubmit
}: { vin: string; cislo_tp: string } & ToolBarComponentProps) => {
  const [state, dispatch] = useReducer(formReducer, { vin, cislo_tp });
  const isEmpty = Object.values(state).every((value) => !value);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isEmpty) return;
        onSubmit(state);
      }}
    >
      <TextField
        label="VIN"
        variant="outlined"
        value={state.vin}
        onChange={(e) =>
          dispatch({ type: 'update', key: 'vin', value: e.target.value })
        }
        disabled={loading}
      />
      <TextField
        label="Číslo TP"
        variant="outlined"
        value={state.cislo_tp}
        onChange={(e) =>
          dispatch({ type: 'update', key: 'cislo_tp', value: e.target.value })
        }
        disabled={loading}
      />
      <Button
        type="button"
        disabled={isEmpty || loading}
        onClick={() => dispatch({ type: 'clear' })}
      >
        Reset
      </Button>
      <Button type="submit" disabled={isEmpty || loading}>
        Hledat
      </Button>
    </form>
  );
};

const Toolbar = ({
  tovarni_znacka,
  typ,
  vin,
  cislo_tp,
  loading,
  onSubmit
}: ToolbarProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <VinForm
        vin={vin}
        cislo_tp={cislo_tp}
        loading={loading}
        onSubmit={onSubmit}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <BrandAutocomplete
        value={tovarni_znacka}
        onSelect={(value) => {
          onSubmit({ tovarni_znacka: value });
        }}
        disabled={loading}
      />
      <ModelAutocomplete
        tovarni_znacka={tovarni_znacka}
        typ={typ}
        onSelect={(value) => {
          onSubmit({ typ: value });
        }}
        disabled={loading || !tovarni_znacka}
      />
    </Stack>
  );
};

export default function Search({
  vehicles,
  currentPage,
  tovarni_znacka,
  typ,
  vin,
  cislo_tp
}: SearchProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = ({
    tovarni_znacka: brandParam = tovarni_znacka,
    typ: modelParam = typ,
    page,
    vin: vinParam = vin,
    cislo_tp: cislo_tpParam = cislo_tp
  }: Partial<{
    tovarni_znacka: string;
    typ: string;
    vin: string;
    cislo_tp: string;
    page: number;
  }>) => {
    setLoading(true);
    const query = Object.fromEntries(
      Object.entries({
        tovarni_znacka: brandParam,
        typ: brandParam ? modelParam : '',
        vin: vinParam,
        cislo_tp: cislo_tpParam,
        page:
          brandParam !== tovarni_znacka ||
          modelParam !== typ ||
          vinParam !== vin ||
          cislo_tpParam !== cislo_tp
            ? 0
            : page
      }).filter(([, value]) =>
        ['', null, undefined].every((val) => value !== val)
      )
    );
    return router
      .push(
        {
          pathname: router.pathname,
          query
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
        onRowClick={(params) => {
          router.push({ pathname: '/vehicle', query: { id: params.row.id } });
        }}
        sx={{
          '& .MuiDataGrid-row': {
            cursor: 'pointer'
          },
          width: '100%'
        }}
        rows={vehicles}
        columns={[
          {
            field: 'tovarni_znacka',
            headerName: 'Tovární značka',
            flex: 0.5,
            minWidth: 200,
            renderCell: (params) => params.row.tovarni_znacka,
            sortable: false,
            filterable: false
          },
          {
            field: 'typ',
            headerName: 'Typ',
            flex: 0.5,
            minWidth: 300,
            renderCell: (params) => params.row.typ,
            sortable: false,
            filterable: false
          },
          {
            field: 'vin',
            headerName: 'VIN',
            flex: 0.5,
            minWidth: 150,
            renderCell: (params) => params.row.vin,
            sortable: false,
            filterable: false
          },
          {
            field: 'cislo_tp',
            headerName: 'Číslo TP',
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => params.row.cislo_tp,
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
            tovarni_znacka,
            typ,
            currentPage,
            onSubmit,
            loading,
            vin,
            cislo_tp
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

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const { page, tovarni_znacka, typ, vin, cislo_tp } = queryDecoder.parse(
    context.query
  );

  const vehicles = await searchVehicles(
    page,
    tovarni_znacka,
    typ,
    vin,
    cislo_tp
  );

  return {
    props: {
      vehicles,
      currentPage: page,
      tovarni_znacka,
      typ,
      vin,
      cislo_tp
    }
  };
};
