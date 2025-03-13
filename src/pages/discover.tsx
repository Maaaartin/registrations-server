import { Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import BrandAutocomplete from '../components/BrandAutocomplete';
import ModelAutocomplete from '../components/ModelAutocomplete';
import { GridSlotProps } from '@mui/x-data-grid';
import {
  DiscoverProps,
  discoverVehicles,
  pageSize,
  queryDecoder
} from '../util/discover';
import VehicleDataGrid from '../components/VehicleDataGrid';
import useDataGridSubmit from '../hooks/useDataGridSubmit';

type SearchParams = {
  page: number;
  tovarni_znacka: string;
  typ: string;
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
    </Stack>
  );
};

const Toolbar = ({ tovarni_znacka, typ, loading, onSubmit }: ToolbarProps) => {
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
    </Stack>
  );
};

export default function Discover({
  vehicles,
  currentPage,
  tovarni_znacka,
  typ
}: DiscoverProps) {
  const { loading, onSubmit } = useDataGridSubmit<SearchParams>({
    page: currentPage,
    tovarni_znacka,
    typ
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
  const { page, tovarni_znacka, typ } = queryDecoder.parse(context.query);

  const vehicles = await discoverVehicles(page, tovarni_znacka, typ);

  return {
    props: {
      vehicles,
      currentPage: page,
      tovarni_znacka,
      typ
    }
  };
};
