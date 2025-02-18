import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from '../prisma';
import { useRouter } from 'next/router';
import BrandAutocomplete from '../internals/components/BrandAutocomplete';
import { useForm } from 'react-hook-form';
import {
  SerializableRegistration,
  serializeRegistration,
} from '../util/registrations';
import ModelAutocomplete from '../internals/components/ModelAutocomplete';
import { DataGrid, GridFilterInputValueProps } from '@mui/x-data-grid';

type Props = {
  vehicles: SerializableRegistration[];
  currentPage: number | null;
  brand: string;
  model: string;
};

const pageSize = 10;

export default function Search({ vehicles, currentPage, brand, model }: Props) {
  const router = useRouter();
  const [vin, setVin] = useState('');
  const form = useForm({
    defaultValues: { brand, model },
  });
  const brandWatch = form.watch('brand');
  useEffect(() => {
    if (!brandWatch) {
      form.resetField('model');
    }
  }, [brandWatch, form.resetField]);
  const onSubmit = (page: number) => (event?: React.BaseSyntheticEvent) => {
    return form.handleSubmit((params) => {
      return router.push(
        {
          pathname: router.pathname,
          query: {
            ...params,
            page: params.brand !== brand || params.model !== model ? 0 : page,
          },
        },
        undefined,
        { scroll: false }
      );
    })(event);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/vehicle`, { query: { vin } });
        }}
      >
        <TextField
          value={vin}
          onChange={(e) => {
            setVin(e.target.value);
          }}
        ></TextField>
      </form>
      <form onSubmit={onSubmit(currentPage || 0)}></form>
      <DataGrid
        onRowClick={(params) => {
          router.push({ pathname: '/vehicle', query: { id: params.row.id } }); // Navigate to vehicle details page
        }}
        rows={vehicles}
        columns={[
          {
            field: 'brand',
            headerName: 'Tovární značka',
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => params.row.tovarni_znacka,
            filterOperators: [
              {
                label: 'Contains',
                value: 'contains',
                getApplyFilterFn: (filterItem) => {
                  return null;
                },
                InputComponent: ({
                  item,
                  applyValue,
                }: GridFilterInputValueProps) => (
                  <BrandAutocomplete
                    value={form.getValues('brand')}
                    onSelect={(value) => {
                      form.setValue('brand', value);
                      applyValue({ ...item, value });
                      onSubmit(currentPage || 0)();
                    }}
                    disabled={form.formState.isSubmitting}
                  />
                ),
              },
            ],
          },
          {
            field: 'model',
            headerName: 'Typ',
            flex: 0.5,
            minWidth: 80,
            renderCell: (params) => params.row.typ,
            filterOperators: [
              {
                label: 'Contains',
                value: 'contains',
                getApplyFilterFn: (filterItem) => {
                  return null;
                },
                InputComponent: ({
                  item,
                  applyValue,
                }: GridFilterInputValueProps) => (
                  <ModelAutocomplete
                    brand={form.getValues('brand')}
                    model={form.getValues('model')}
                    onSelect={(value) => {
                      form.setValue('model', value);
                      applyValue({ ...item, value });
                      onSubmit(currentPage || 0)();
                    }}
                    disabled={form.formState.isSubmitting}
                  />
                ),
              },
            ],
          },
        ]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: {
            paginationModel: { page: currentPage || 0, pageSize },
            meta: { hasNextPage: true },
          },
        }}
        paginationMode="server"
        pageSizeOptions={[pageSize]}
        onPaginationModelChange={(params) => {
          return onSubmit(params.page)();
        }}
        rowCount={-1}
        loading={form.formState.isSubmitting}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page, brand, model } = context.query;

  const currentPage = parseInt(page as string, 10) || 0;
  const brandStr = [brand].flat()[0] || '';
  const typStr = [model].flat()[0] || '';

  const vehicles = await prisma.registrations.findMany({
    skip: currentPage * pageSize,
    take: pageSize,
    where: { tovarni_znacka: brandStr || undefined, typ: typStr || undefined },
  });

  return {
    props: {
      vehicles: vehicles.map(serializeRegistration),
      currentPage,
      brand: brandStr,
      model: typStr,
    },
  };
};
