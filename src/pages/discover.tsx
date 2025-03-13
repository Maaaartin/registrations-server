import { Stack } from '@mui/material';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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

type ToolBarComponentProps = {
  loading: boolean;
  onSubmit: (
    params: Partial<{
      tovarni_znacka: string;
      typ: string;
      vin: string;
      cislo_tp: string;
      page: number;
    }>
  ) => Promise<boolean>;
};

type ToolbarProps = GridSlotProps['toolbar'] &
  Omit<DiscoverProps, 'vehicles'> &
  ToolBarComponentProps;

const AutocompleteSearchForm = ({
  tovarni_znacka,
  typ,
  loading,
  onSubmit
}: ToolBarComponentProps & { tovarni_znacka: string; typ: string }) => {
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
  return (
    <Stack direction="row" spacing={2} padding={2}>
      <AutocompleteSearchForm
        tovarni_znacka={tovarni_znacka}
        typ={typ}
        loading={loading}
        onSubmit={onSubmit}
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = ({
    tovarni_znacka: brandParam = tovarni_znacka,
    typ: modelParam = typ,
    page
  }: Partial<{
    tovarni_znacka: string;
    typ: string;
    vin: string;
    cislo_tp: string;
    page: number;
  }>) => {
    setLoading(true);
    const query = Object.fromEntries(
      Object.entries({
        tovarni_znacka: brandParam,
        typ: brandParam ? modelParam : '',
        page: brandParam !== tovarni_znacka || modelParam !== typ ? 0 : page
      }).filter(([, value]) =>
        ['', null, undefined].every((val) => value !== val)
      )
    );
    return router
      .push(
        {
          pathname: router.pathname,
          query
        },
        undefined,
        { scroll: false }
      )
      .finally(() => {
        setLoading(false);
      });
  };
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
        onPaginationModelChange={(params) => {
          return onSubmit({ page: params.page });
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
            currentPage,
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
