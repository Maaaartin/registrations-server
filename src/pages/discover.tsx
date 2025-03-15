import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { GridSlotProps } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import {
  DiscoverProps,
  discoverVehicles,
  pageSize,
  queryDecoder
} from '../util/discover';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';

type SearchParams = {
  page: number;
  tovarni_znacka: string;
  typ: string;
  datum_prvni_registrace_od: string | null;
};

type SubmitProps = ReturnType<typeof useDataGridSubmit<SearchParams>>;

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<DiscoverProps, 'vehicles'> &
  SubmitProps;

const AutocompleteSearchForm = ({
  tovarni_znacka,
  typ,
  datum_prvni_registrace_od,
  loading,
  onSubmit
}: SubmitProps & Omit<SearchParams, 'page'>) => {
  return (
    <Stack direction="row" spacing={1} padding={1} overflow="scroll">
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
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          label="Datum první registrace od"
          value={
            datum_prvni_registrace_od
              ? DateTime.fromISO(datum_prvni_registrace_od)
              : null
          }
          onChange={(newValue) => {
            onSubmit({ datum_prvni_registrace_od: newValue?.toISO() });
          }}
          views={['day', 'month', 'year']}
        />
      </LocalizationProvider>
    </Stack>
  );
};

const Toolbar = ({
  tovarni_znacka,
  typ,
  datum_prvni_registrace_od,
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
        datum_prvni_registrace_od={datum_prvni_registrace_od}
        loading={loading}
        onSubmit={onSubmit_}
      />
    </Stack>
  );
};

export default function Discover({
  vehicles,
  currentPage,
  tovarni_znacka,
  typ,
  datum_prvni_registrace_od
}: DiscoverProps) {
  const { loading, onSubmit } = useDataGridSubmit<SearchParams>({
    page: currentPage,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od: datum_prvni_registrace_od
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
  const { page, tovarni_znacka, typ, datum_prvni_registrace_od } =
    queryDecoder.parse(context.query);

  const vehicles = await discoverVehicles(
    page,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od
  );

  return {
    props: {
      vehicles,
      currentPage: page,
      tovarni_znacka,
      typ,
      datum_prvni_registrace_od:
        datum_prvni_registrace_od?.toISOString() || null
    }
  };
};
