import { Button, Stack, TextField } from '@mui/material';
import { useEffect, useReducer } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { GridSlotProps } from '@mui/x-data-grid';
import { SearchProps, formReducer } from '../util/search';
import { searchVehicles, queryDecoder } from '../util/search/server';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';

type SearchParams = {
  vin: string;
  cislo_tp: string;
};

type SubmitProps = ReturnType<typeof useDataGridSubmit<SearchParams>>;

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<SearchProps, 'vehicles'> &
  SubmitProps;

const TextSearchForm = ({
  vin = '',
  cislo_tp = '',
  loading,
  onSubmit
}: SearchParams & SubmitProps) => {
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
  const { loading, onSubmit } = useDataGridSubmit<SearchParams>({
    vin,
    cislo_tp
  });

  useEffect(() => {
    if (loading && vehicles.length === 1) {
      router.push({ pathname: '/vehicle', query: { id: vehicles[0].id } });
    }
  }, [loading, vehicles]);

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
