import { useReducer } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { GridSlotProps } from '@mui/x-data-grid';
import { SearchProps, SearchState, formReducer, limit } from '../util/search';
import { searchVehicles, queryDecoder } from '../util/search/server';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';

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
      {resultCount >= limit && (
        <Typography variant="caption">
          Bylo nalezeno více než {limit} výsledků. Zkuste zpřesnnit hledání.
        </Typography>
      )}
    </>
  );
};

export default function Search({
  vehicles,
  vin,
  cislo_tp,
  cislo_orv
}: SearchProps) {
  const { loading, onSubmit } = useDataGridSubmit<SearchState>({
    vin,
    cislo_tp,
    cislo_orv
  });

  return (
    <>
      <VehicleDataGrid
        rows={vehicles}
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
            cislo_tp,
            resultCount: vehicles.length
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  context
) => {
  console.log(context.params);
  const parsed = queryDecoder.parse(context.query);
  const { vin, cislo_tp, cislo_orv } = parsed;
  const values = Object.values(parsed);
  const vehicles =
    values.filter(Boolean).length === 0
      ? []
      : await searchVehicles(vin, cislo_tp, cislo_orv);

  const props = { vehicles, vin, cislo_tp, cislo_orv };
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
