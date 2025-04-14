import {
  Stack,
  NativeSelect,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';
import { GetServerSideProps } from 'next';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { GridSlotProps } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { mergeLeft, pick } from 'ramda';
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
import { useEffect, useState } from 'react';
import { DiscoverVehiclesParams } from '../../prisma/queries';

type AutocompleteParams = {
  tovarni_znacka: string;
  typ: string;
};

type DateSearchParams = {
  datum_prvni_registrace_od: string | null;
  datum_prvni_registrace_do: string | null;
};

type SearchParams = Omit<
  DiscoverVehiclesParams,
  'datum_prvni_registrace_od' | 'datum_prvni_registrace_do'
> &
  DateSearchParams;
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
    <Stack direction="row" spacing={2} padding={2}>
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
    </Stack>
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
      <Stack direction="row" spacing={2} padding={2}>
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
      </Stack>
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
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AutocompleteSearchForm {...props} onSubmit={onSubmit_} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <DateSearch {...props} onSubmit={onSubmit_} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <PohonSelector
          pohon={props.pohon}
          onSubmit={onSubmit_}
          loading={props.loading}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <FormControlLabel
          checked={props.imported}
          control={
            <Checkbox
              checked={props.imported}
              onChange={(e) => onSubmit_({ imported: e.target.checked })}
            />
          }
          label="Dovezeno"
        />
        <FormControlLabel
          checked={props.removed}
          control={
            <Checkbox
              checked={props.removed}
              onChange={(e) => onSubmit_({ removed: e.target.checked })}
            />
          }
          label="Vyřazeno z provozu"
        />
      </Grid>
    </Grid>
  );
};

const searchKeys = [
  'tovarni_znacka',
  'typ',
  'datum_prvni_registrace_od',
  'datum_prvni_registrace_do',
  'pohon',
  'imported',
  'removed'
] as const;

export default function Discover(props: DiscoverProps) {
  const {
    vehicles,
    currentPage,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do,
    pageSize,
    pohon,
    imported,
    removed
  } = props;
  const { loading, onSubmit } = useDataGridSubmit<SearchParams>({
    page: currentPage,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do,
    pageSize,
    pohon,
    imported,
    removed
  });
  const searchProps = pick(searchKeys, props);
  const [countParams, setCountParams] =
    useState<Partial<SearchParams>>(searchProps);

  useEffect(() => {
    setCountParams(searchProps);
  }, [props]);

  const { data: fetchedRowCount } = useFetch({
    url:
      vehicles.length < pageSize
        ? null
        : `/api/discover-count?${new URLSearchParams(
            filterQuery(Object.entries(countParams as Record<string, string>))
          )}`,
    decoder: DNumber
  });
  const onSubmit_: typeof onSubmit = (params) => {
    const merged = mergeLeft(params, searchProps);
    const picked = pick(searchKeys, merged);
    setCountParams(picked);
    return onSubmit(params);
  };

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
        onPaginationModelChange={onSubmit}
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
            onSubmit: onSubmit_,
            loading,
            pohon,
            imported,
            removed
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
    pohon,
    imported,
    removed
  } = queryDecoder.parse(context.query);

  const vehicles = await discoverVehicles({
    page,
    pageSize,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_od,
    datum_prvni_registrace_do,
    pohon,
    imported,
    removed
  });
  return {
    props: {
      vehicles,
      currentPage: page,
      tovarni_znacka,
      typ,
      pageSize,
      pohon,
      imported,
      removed,
      datum_prvni_registrace_od: datum_prvni_registrace_od
        ? DateTime.fromJSDate(datum_prvni_registrace_od).toFormat(DateFormat)
        : null,
      datum_prvni_registrace_do: datum_prvni_registrace_do
        ? DateTime.fromJSDate(datum_prvni_registrace_do).toFormat(DateFormat)
        : null
    }
  };
};
