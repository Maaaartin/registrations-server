import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { GridSlotProps } from '@mui/x-data-grid';
import { pageSize, ImportsProps } from '../content/imports';
import { searchImports, queryDecoder } from '../content/imports/server';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';
import useFetch from '../hooks/useFetch';
import { countriesImportsAction } from '../actions';
import AutocompleteBase from '../components/AutocompleteBase';

type SubmitProps = ReturnType<
  typeof useDataGridSubmit<Omit<ImportsProps, 'vehiclesWithImports'>>
>;
type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<ImportsProps, 'vehiclesWithImports'> &
  SubmitProps;

const Toolbar = ({ country, onSubmit }: ToolbarProps) => {
  const { data, isLoading } = useFetch(countriesImportsAction);
  const countries = data?.map((row) => row.value);
  return (
    <Stack spacing={1} padding={1}>
      <AutocompleteBase
        defaultValue={country}
        label="Země"
        loading={isLoading}
        options={countries || []}
        onBlur={(e) => {
          const value = (e.target as HTMLInputElement).value;
          if (!value) {
            onSubmit({ country: '', page: 0 });
          }
        }}
        onChange={(event, value) => {
          if (value) {
            onSubmit({ country: value, page: 0 });
          }
        }}
      />
    </Stack>
  );
};

export default function Search({
  vehiclesWithImports,
  page,
  country
}: ImportsProps) {
  const { loading, onSubmit } = useDataGridSubmit({
    page,
    country
  });
  const rowCount =
    vehiclesWithImports.length < pageSize ? (page + 1) * pageSize : -1;
  return (
    <>
      <VehicleDataGrid
        paginationMode="server"
        filterMode="server"
        loading={loading}
        rows={vehiclesWithImports}
        initialState={{
          pagination: {
            paginationModel: { page, pageSize },
            meta: { hasNextPage: true }
          }
        }}
        paginationModel={{ page, pageSize }}
        pageSizeOptions={[pageSize]}
        onPaginationModelChange={(params) => onSubmit({ page: params.page })}
        rowCount={rowCount}
        slots={{
          toolbar: Toolbar as React.JSXElementConstructor<
            GridSlotProps['toolbar']
          >
        }}
        slotProps={{
          toolbar: {
            country,
            onSubmit
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ImportsProps> = async (
  context
) => {
  const { country, page } = queryDecoder.parse(context.query);
  const vehiclesWithImports = await searchImports(page, country);
  return {
    props: {
      vehiclesWithImports,
      page,
      country
    }
  };
};
