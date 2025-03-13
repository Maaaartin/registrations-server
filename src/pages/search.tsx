import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { GridSlotProps } from '@mui/x-data-grid';
import {
  searchVehicles,
  SearchProps,
  queryDecoder,
  formReducer
} from '../util/search';
import VehicleDataGrid from '../components/VehicleDataGrid';

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

const TextSearchForm = ({
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
        if (isEmpty) return;
        onSubmit(state);
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
            dispatch({ type: 'update', key: 'cislo_tp', value: e.target.value })
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
  );
};

const Toolbar = ({ vin, cislo_tp, loading, onSubmit }: ToolbarProps) => {
  return (
    <Stack direction="row" spacing={2} padding={2}>
      <TextSearchForm
        vin={vin}
        cislo_tp={cislo_tp}
        loading={loading}
        onSubmit={onSubmit}
      />
    </Stack>
  );
};

export default function Search({ vehicles, vin, cislo_tp }: SearchProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading && vehicles.length === 1) {
      router.push({ pathname: '/vehicle', query: { id: vehicles[0].id } });
    }
  }, [loading, vehicles]);

  const onSubmit = ({
    vin: vinParam = vin,
    cislo_tp: cislo_tpParam = cislo_tp
  }: Partial<{
    vin: string;
    cislo_tp: string;
  }>) => {
    setLoading(true);
    const query = Object.fromEntries(
      Object.entries({
        vin: vinParam,
        cislo_tp: cislo_tpParam
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

  return (
    <>
      <VehicleDataGrid
        vehicles={vehicles}
        loading={loading}
        initialState={{
          pagination: {
            meta: { hasNextPage: false }
          }
        }}
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
            cislo_tp
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  const { vin, cislo_tp } = queryDecoder.parse(context.query);

  const vehicles =
    [vin, cislo_tp].filter(Boolean).length === 0
      ? []
      : await searchVehicles(vin, cislo_tp);

  return {
    props: {
      vehicles,
      vin,
      cislo_tp
    }
  };
};
