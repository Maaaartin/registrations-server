import type React from 'react';
import { Grid, Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { GridSlotProps } from '@mui/x-data-grid';
import { pageSize, ImportsProps } from '../content/imports';
import { searchImports, queryDecoder } from '../content/imports/server';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';
import useFetch from '../hooks/useFetch';
import { countriesImportsAction } from '../actions';
import AutocompleteBase from '../components/AutocompleteBase';
import { getGridLocaleText } from '../content/localization';
import Head from 'next/head';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';

type SubmitProps = ReturnType<
  typeof useDataGridSubmit<Omit<ImportsProps, 'vehiclesWithImports'>>
>;
type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<ImportsProps, 'vehiclesWithImports'> &
  SubmitProps;

const Toolbar = ({
  country,
  onSubmit,
  tovarni_znacka,
  typ,
  loading
}: ToolbarProps) => {
  const { data, isLoading } = useFetch(countriesImportsAction);
  const countries = data?.map((row) => row.value);
  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <Stack direction="row" spacing={2} padding={2}>
          <BrandAutocomplete
            value={tovarni_znacka}
            onSelect={(value) => {
              if (value !== tovarni_znacka) {
                onSubmit({
                  tovarni_znacka: value,
                  typ: '',
                  country,
                  page: 0
                });
              }
            }}
            disabled={loading}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <Stack direction="row" spacing={2} padding={2}>
          <ModelAutocomplete
            tovarni_znacka={tovarni_znacka}
            typ={typ}
            onSelect={(value) => {
              if (value !== typ) {
                onSubmit({ typ: value, country, page: 0, tovarni_znacka });
              }
            }}
            disabled={loading || !tovarni_znacka}
          />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <Stack direction="row" spacing={2} padding={2}>
          <AutocompleteBase
            defaultValue={country}
            label="Země"
            loading={isLoading}
            options={countries || []}
            onBlur={(e) => {
              const value = (e.target as HTMLInputElement).value;
              if (!value) {
                onSubmit({ country: '', page: 0, tovarni_znacka, typ });
              }
            }}
            onChange={(event, value) => {
              if (value) {
                onSubmit({ country: value, page: 0, tovarni_znacka, typ });
              }
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default function Search({
  vehiclesWithImports,
  page,
  country,
  tovarni_znacka,
  typ,
  error
}: ImportsProps) {
  const { loading, onSubmit } = useDataGridSubmit({
    page,
    country,
    tovarni_znacka,
    typ
  });
  const rowCount =
    vehiclesWithImports.length < pageSize ? (page + 1) * pageSize : -1;
  return (
    <>
      <Head>
        <title>Informace o dovozech – Info o vozidlech</title>
        <meta
          name="description"
          content="Informace o vozidlech dovezených do ČR."
        />
      </Head>
      <VehicleDataGrid
        paginationMode="server"
        filterMode="server"
        loading={loading}
        localeText={getGridLocaleText({ error, pageSize })}
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
            onSubmit,
            tovarni_znacka,
            typ,
            loading
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ImportsProps> = async (
  context
) => {
  const { country, page, tovarni_znacka, typ } = queryDecoder.parse(
    context.query
  );
  const props = {
    vehiclesWithImports: [],
    page,
    country,
    tovarni_znacka,
    typ
  };

  try {
    const vehiclesWithImports = await searchImports(
      page,
      country,
      tovarni_znacka,
      typ
    );

    return {
      props: {
        ...props,
        vehiclesWithImports
      }
    };
  } catch (error) {
    if (['P2010', 'P2028'].includes((error as NodeJS.ErrnoException).code!)) {
      console.warn('searchImports timeout');
      return { props: { ...props, error: true } };
    }
    throw error;
  }
};
