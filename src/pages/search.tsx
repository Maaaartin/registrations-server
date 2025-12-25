import React, { useReducer } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { GridSlotProps } from '@mui/x-data-grid';
import {
  SearchProps,
  SearchState,
  formReducer,
  pageSize
} from '../content/search';
import { searchVehicles, queryDecoder } from '../content/search/server';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';
import Head from 'next/head';

type SubmitProps = ReturnType<typeof useDataGridSubmit<SearchState>>;

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<SearchProps, 'vehicles'> &
  SubmitProps & { resultCount: number };

const Toolbar = ({
  vin,
  cislo_tp,
  cislo_orv,
  loading,
  onSubmit,
  resultCount
}: ToolbarProps) => {
  const [state, dispatch] = useReducer(formReducer, {
    vin,
    cislo_tp,
    cislo_orv
  });
  const isEmpty = !Object.values(state).filter(Boolean).length;
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEmpty) return;
          onSubmit({ ...state, page: 0 });
        }}
      >
        <Stack spacing={1} padding={1}>
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
              dispatch({
                type: 'update',
                key: 'cislo_tp',
                value: e.target.value
              })
            }
            disabled={loading}
          />
          <TextField
            label="Číslo ORV"
            variant="outlined"
            value={state.cislo_orv}
            onChange={(e) =>
              dispatch({
                type: 'update',
                key: 'cislo_orv',
                value: e.target.value
              })
            }
            disabled={loading}
          />
          <Button
            color="error"
            type="button"
            variant="contained"
            disabled={isEmpty || loading}
            onClick={() => dispatch({ type: 'clear' })}
          >
            Reset
          </Button>
          <Button
            color="success"
            variant="contained"
            type="submit"
            disabled={isEmpty || loading}
          >
            Hledat
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default function Search({
  vehicles,
  vin,
  cislo_tp,
  cislo_orv,
  page
}: SearchProps) {
  const currentPage = page ?? 0;
  const { loading, onSubmit } = useDataGridSubmit<SearchState>({
    vin,
    cislo_tp,
    cislo_orv,
    page: currentPage
  });
  const rowCount =
    vehicles.length < pageSize ? currentPage * pageSize + vehicles.length : -1;
  const resultCount =
    rowCount === -1 ? currentPage * pageSize + vehicles.length : rowCount;

  return (
    <>
      <Head>
        <title>Hledání vozidel – Info o vozidlech</title>
        <meta name="description" content="Hledání podle VIN, TP nebo ORV." />
      </Head>
      <VehicleDataGrid
        rows={vehicles}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: { page: currentPage, pageSize },
            meta: { hasNextPage: true }
          }
        }}
        onPaginationModelChange={(params) => onSubmit({ page: params.page })}
        paginationMode="server"
        filterMode="server"
        paginationModel={{ page: currentPage, pageSize }}
        pageSizeOptions={[pageSize]}
        rowCount={rowCount}
        slots={{
          toolbar: Toolbar as React.JSXElementConstructor<
            GridSlotProps['toolbar']
          >
        }}
        slotProps={{
          toolbar: {
            onSubmit,
            loading,
            vin,
            cislo_tp,
            cislo_orv,
            resultCount
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const parsed = queryDecoder.parse(context.query);
  const { vin, cislo_tp, cislo_orv, page } = parsed;
  const hasQuery = [vin, cislo_tp, cislo_orv].some(Boolean);
  const vehicles = hasQuery
    ? await searchVehicles(vin, cislo_tp, cislo_orv, page)
    : [];

  const props = { vehicles, vin, cislo_tp, cislo_orv, page };
  if (vehicles.length === 1) {
    return {
      redirect: {
        destination: `/vehicle?id=${vehicles[0].id}`
      },
      props
    };
  }
  return {
    props
  };
};
