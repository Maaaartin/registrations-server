import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { GridSlotProps } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { DateFormat, DiscoverProps, pageSize } from '../util/discover';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { discoverVehicles, queryDecoder } from '../util/discover/server';

type AutocompleteParams = {
  tovarni_znacka: string;
  typ: string;
};

type DateSearchParams = {
  datum_prvni_registrace_od: string | null;
  datum_prvni_registrace_do: string | null;
};

type SearchParams = AutocompleteParams &
  DateSearchParams & {
    page: number;
  };

type SubmitProps = ReturnType<typeof useDataGridSubmit<SearchParams>>;

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<DiscoverProps, 'vehicles'> &
  SubmitProps;

const AutocompleteSearchForm = ({
  tovarni_znacka,
  typ,
  loading,
  onSubmit
}: SubmitProps & AutocompleteParams) => {
  return (
    <>
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
    </>
  );
};

const DateSearch = ({
  datum_prvni_registrace_od,
  datum_prvni_registrace_do,
  onSubmit,
  loading
}: SubmitProps & DateSearchParams) => {
  const fromDate = datum_prvni_registrace_od
    ? DateTime.fromFormat(datum_prvni_registrace_od, DateFormat)
    : undefined;
  const toDate = datum_prvni_registrace_do
    ? DateTime.fromFormat(datum_prvni_registrace_do, DateFormat)
    : undefined;
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        disableFuture
        disabled={loading}
        label="Datum první registrace od"
        value={
          datum_prvni_registrace_od
            ? DateTime.fromFormat(datum_prvni_registrace_od, DateFormat)
            : null
        }
        maxDate={toDate}
        onChange={(newValue) => {
          onSubmit({
            datum_prvni_registrace_od: newValue?.toFormat(DateFormat) || null
          });
        }}
        views={['day', 'month', 'year']}
      />
      <DatePicker
        disableFuture
        disabled={loading}
        label="Datum první registrace do"
        minDate={fromDate}
        value={toDate}
        onChange={(newValue) => {
          onSubmit({
            datum_prvni_registrace_do: newValue?.toFormat(DateFormat) || null
          });
        }}
        views={['day', 'month', 'year']}
      />
    </LocalizationProvider>
  );
};

const Toolbar = ({
  tovarni_znacka,
  typ,
  datum_prvni_registrace_od,
  datum_prvni_registrace_do,
  loading,
  onSubmit
}: ToolbarProps) => {
  const onSubmit_ = (params: Partial<SearchParams>) =>
    onSubmit({
      ...params,
      page:
        params.tovarni_znacka !== tovarni_znacka || params.typ !== typ
          ? 0
          : params.page
    });
  return (
    <Stack direction="row" spacing={2} padding={2}>
      <AutocompleteSearchForm
        tovarni_znacka={tovarni_znacka}
        typ={typ}
        loading={loading}
        onSubmit={onSubmit_}
      />
      <DateSearch
        loading={loading}
        onSubmit={onSubmit_}
        datum_prvni_registrace_od={datum_prvni_registrace_od}
        datum_prvni_registrace_do={datum_prvni_registrace_do}
      />
    </Stack>
  );
};

export default function Discover({
  vehicles,
  currentPage,
  tovarni_znacka,
  typ,
  datum_prvni_registrace_od,
  datum_prvni_registrace_do
}: DiscoverProps) {
  const { loading, onSubmit } = useDataGridSubmit<SearchParams>({
    page: currentPage,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do
  });

  const rowCount =
    vehicles.length < pageSize ? (currentPage + 1) * pageSize : -1;

  return (
    <>
      <VehicleDataGrid
        paginationMode="server"
        filterMode="server"
        vehicles={vehicles}
        loading={loading}
        rows={vehicles}
        initialState={{
          pagination: {
            paginationModel: { page: currentPage, pageSize },
            meta: { hasNextPage: true }
          }
        }}
        paginationModel={{ page: currentPage, pageSize }}
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
            tovarni_znacka,
            typ,
            datum_prvni_registrace_od,
            datum_prvni_registrace_do,
            onSubmit,
            loading
          } as ToolbarProps
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<DiscoverProps> = async (
  context
) => {
  const {
    page,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do
  } = queryDecoder.parse(context.query);

  const vehicles = await discoverVehicles(
    page,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do
  );

  return {
    props: {
      vehicles,
      currentPage: page,
      tovarni_znacka,
      typ,
      datum_prvni_registrace_od: datum_prvni_registrace_od
        ? DateTime.fromJSDate(datum_prvni_registrace_od).toFormat(DateFormat)
        : null,
      datum_prvni_registrace_do: datum_prvni_registrace_do
        ? DateTime.fromJSDate(datum_prvni_registrace_do).toFormat(DateFormat)
        : null
    }
  };
};
