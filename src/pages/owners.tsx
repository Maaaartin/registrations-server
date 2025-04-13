import { Button, Stack, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { GridSlotProps } from '@mui/x-data-grid';
import { OwnersParams, OwnersProps } from '../content/owners';
import {
  getVehiclesAndOwnerFromIco,
  queryDecoder
} from '../content/owners/server';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';

type SubmitProps = ReturnType<typeof useDataGridSubmit<OwnersParams>>;
type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<OwnersProps, 'vehiclesWithImports'> &
  SubmitProps;

const Toolbar = ({ ico, loading, onSubmit }: ToolbarProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const ico = formData.get('ico') as string;
        if (!ico) return;
        onSubmit({ ico });
      }}
    >
      <Stack spacing={1} padding={1}>
        <TextField
          defaultValue={ico}
          name="ico"
          label="IČO"
          variant="outlined"
          disabled={loading}
        />
        <Button
          color="success"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          Hledat
        </Button>
      </Stack>
    </form>
  );
};

export default function Owners({ ico, vehicles }: OwnersProps) {
  const { loading, onSubmit } = useDataGridSubmit<OwnersParams>({ ico });
  return (
    <>
      <VehicleDataGrid
        loading={loading}
        rows={vehicles}
        rowCount={vehicles.length}
        slots={{
          toolbar: Toolbar as React.JSXElementConstructor<
            GridSlotProps['toolbar']
          >
        }}
        slotProps={{
          toolbar: {
            ico,
            loading,
            onSubmit
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<OwnersProps> = async (
  context
) => {
  const { ico } = queryDecoder.parse(context.query);
  if (!ico) {
    return { props: { vehicles: [], ico } };
  }
  const { owners, registrations: vehicles } = await getVehiclesAndOwnerFromIco({
    ico
  });
  if (!owners) {
    return { notFound: true };
  }
  return {
    props: {
      vehicles,
      ico
    }
  };
};
