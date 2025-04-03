import { Stack, NativeSelect, FormControl, InputLabel } from '@mui/material';
import { GetServerSideProps } from 'next';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { GridSlotProps } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import {
  DateFormat,
  DiscoverProps,
  Pohon,
  defaultPageSize,
  maxPageSize,
  stringToPohon
} from '../content/discover';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider
} from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { discoverVehicles, queryDecoder } from '../content/discover/server';
import { datePickerLocaleText } from '../content/localization';
import useFetch from '../hooks/useFetch';
import { DNumber } from '../content/decoders';
import { filterQuery } from '../content/data';

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
    pageSize: number;
    pohon: Pohon | '';
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
          if (value !== tovarni_znacka) {
            onSubmit({ tovarni_znacka: value, typ: '' });
          }
        }}
        disabled={loading}
      />
      <ModelAutocomplete
        tovarni_znacka={tovarni_znacka}
        typ={typ}
        onSelect={(value) => {
          if (value !== typ) {
            onSubmit({ typ: value });
          }
        }}
        disabled={loading || !tovarni_znacka}
      />
    </>
  );
};

const datePickerProps: Partial<DatePickerProps<DateTime>> = {
  disableFuture: true,
  slotProps: {
    actionBar: {
      actions: ['clear']
    },
    popper: {
      sx: {
        '.MuiPickersYear-yearButton.Mui-disabled': {
          opacity: 0.5,
          textDecoration: 'line-through',
          color: 'gray',
          cursor: 'not-allowed'
        }
      }
    }
  },
  format: DateFormat,
  openTo: 'year',
  views: ['day', 'year']
};

const DateSearch = ({
  datum_prvni_registrace_od,
  datum_prvni_registrace_do,
  onSubmit,
  loading
}: SubmitProps & DateSearchParams) => {
  const fromDate = datum_prvni_registrace_od
    ? DateTime.fromFormat(datum_prvni_registrace_od, DateFormat)
    : null;
  const toDate = datum_prvni_registrace_do
    ? DateTime.fromFormat(datum_prvni_registrace_do, DateFormat)
    : null;
  return (
    <LocalizationProvider
      dateAdapter={AdapterLuxon}
      adapterLocale="cs"
      localeText={datePickerLocaleText}
    >
      <DatePicker
        {...datePickerProps}
        disabled={loading}
        label="Datum první registrace od"
        value={fromDate}
        maxDate={toDate || undefined}
        onChange={(newValue) => {
          onSubmit({
            datum_prvni_registrace_od: newValue?.toFormat(DateFormat) || ''
          });
        }}
      />
      <DatePicker
        {...datePickerProps}
        disabled={loading}
        label="Datum první registrace do"
        minDate={fromDate || undefined}
        value={toDate}
        onChange={(newValue) => {
          onSubmit({
            datum_prvni_registrace_do: newValue?.toFormat(DateFormat) || ''
          });
        }}
      />
    </LocalizationProvider>
  );
};

function PohonSelector({
  pohon,
  onSubmit,
  loading
}: SubmitProps & { pohon: Pohon }) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="pohon">
        Pohon
      </InputLabel>
      <NativeSelect
        disabled={loading}
        defaultValue={pohon}
        inputProps={{
          name: 'pohon',
          id: 'pohon'
        }}
        onChange={(e) => {
          console.log(e.target.value);
          onSubmit({ pohon: stringToPohon(e.target.value) || '' });
        }}
      >
        <option></option>
        <option value={'electric'}>Elektrický</option>
        <option value={'hybrid'}>Hybridní</option>
      </NativeSelect>
    </FormControl>
  );
}

const Toolbar = (props: ToolbarProps) => {
  const onSubmit_ = (params: Partial<SearchParams>) =>
    props.onSubmit({
      ...params,
      page: 0
    });
  return (
    <Stack direction="row" spacing={2} padding={2}>
      <AutocompleteSearchForm {...props} onSubmit={onSubmit_} />
      <DateSearch {...props} onSubmit={onSubmit_} />
      <PohonSelector
        pohon={props.pohon}
        onSubmit={onSubmit_}
        loading={props.loading}
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
  datum_prvni_registrace_do,
  pageSize,
  pohon
}: DiscoverProps) {
  const { loading, onSubmit } = useDataGridSubmit<SearchParams>({
    page: currentPage,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do,
    pageSize,
    pohon
  });
  const { data: fetchedRowCount } = useFetch({
    url:
      vehicles.length < pageSize
        ? null
        : `/api/discover-count?${new URLSearchParams(
            filterQuery(
              Object.entries({
                tovarni_znacka,
                typ,
                datum_prvni_registrace_od: datum_prvni_registrace_od,
                datum_prvni_registrace_do: datum_prvni_registrace_do,
                pohon
              })
            )
          )}`,
    decoder: DNumber
  });

  const rowCount =
    fetchedRowCount ??
    (vehicles.length < pageSize ? (currentPage + 1) * pageSize : -1);
  return (
    <>
      <VehicleDataGrid
        paginationMode="server"
        filterMode="server"
        loading={loading}
        rows={vehicles}
        paginationModel={{ page: currentPage, pageSize }}
        pageSizeOptions={[10, defaultPageSize, 50, maxPageSize]}
        onPaginationModelChange={(params) => {
          onSubmit({
            ...params,
            page: pageSize !== params.pageSize ? 0 : params.page
          });
        }}
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
            loading,
            pohon
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
    datum_prvni_registrace_do,
    pageSize,
    pohon
  } = queryDecoder.parse(context.query);

  const vehicles = await discoverVehicles({
    page,
    pageSize,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do,
    pohon
  });
  return {
    props: {
      vehicles,
      currentPage: page,
      tovarni_znacka,
      typ,
      pageSize,
      pohon,
      datum_prvni_registrace_od: datum_prvni_registrace_od
        ? DateTime.fromJSDate(datum_prvni_registrace_od).toFormat(DateFormat)
        : null,
      datum_prvni_registrace_do: datum_prvni_registrace_do
        ? DateTime.fromJSDate(datum_prvni_registrace_do).toFormat(DateFormat)
        : null
    }
  };
};
