import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { Prisma } from '@prisma/client';
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
import VehiclePagination from '../internals/components/VehiclePagination';
import Link from 'next/link';
import ModelAutocomplete from '../internals/components/ModelAutocomplete';
import { DataGrid } from '@mui/x-data-grid';

type Props = {
  vehicles: SerializableRegistration[] | null;
  currentPage: number | null;
  brand: string;
  model: string;
};

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
  const onSubmit = (event?: React.BaseSyntheticEvent) => {
    return form.handleSubmit(({ brand, model }) => {
      return router.push(
        {
          pathname: router.pathname,
          query: { brand, model, page: currentPage || 1 },
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
      <form onSubmit={onSubmit}>
        <BrandAutocomplete
          value={form.getValues('brand')}
          onSelect={(value) => form.setValue('brand', value)}
          disabled={form.formState.isSubmitting}
        />
        <ModelAutocomplete
          brand={form.getValues('brand')}
          model={form.getValues('model')}
          onSelect={(value) => {
            return form.setValue('model', value);
          }}
          disabled={form.formState.isSubmitting}
        />
        <Button disabled={form.formState.isSubmitting} type="submit">
          Hledat
        </Button>
      </form>
      {form.formState.isSubmitting && <CircularProgress />}
      {vehicles && !form.formState.isSubmitting && (
        <DataGrid
          checkboxSelection
          rows={vehicles}
          columns={[
            {
              field: 'brand',
              headerName: 'Tovární značka',
              flex: 0.5,
              minWidth: 80,
              renderCell: (params) => params.row.tovarni_znacka,
            },
          ]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
              meta: { hasNextPage: true },
            },
          }}
          pageSizeOptions={[10]}
          rowCount={-1}
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
        // <TableContainer component={Paper}>
        //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
        //     <TableBody>
        //       {vehicles.map((vehicle) => (
        //         <TableRow
        //           key={vehicle.id}
        //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //         >
        //           <TableCell component="th" scope="row">
        //             {vehicle.tovarni_znacka}
        //           </TableCell>
        //           <TableCell component="th" scope="row">
        //             {vehicle.typ}
        //           </TableCell>
        //           <TableCell>
        //             <Link
        //               key={vehicle.id}
        //               href={`/vehicle?${new URLSearchParams({
        //                 id: String(vehicle.id),
        //               })}`}
        //             >
        //               Podrobnosti
        //             </Link>
        //           </TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>
      )}

      {currentPage !== null && (
        <VehiclePagination
          currentPage={currentPage}
          getPageLink={(page) => {
            const { brand, model } = form.getValues();
            const urlParams = new URLSearchParams({
              page: String(page),
              brand,
              model,
            });
            return router.pathname + '?' + urlParams.toString();
          }}
        />
      )}
    </div>
  );
}

const pageSize = 10;
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { page, brand, model } = context.query;
  if (!page) {
    return {
      props: { vehicles: null, currentPage: null, brand: '', model: '' },
    };
  }

  const currentPage = parseInt(page as string, 10) || 1;
  const brandStr = [brand].flat()[0] || '';
  const typStr = [model].flat()[0] || '';

  const vehicles = await prisma.registrations.findMany({
    skip: (currentPage - 1) * pageSize,
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
