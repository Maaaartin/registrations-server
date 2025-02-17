import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
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

type Props = {
  vehicles: SerializableRegistration[] | null;
  currentPage: number | null;
};

export default function Search({ vehicles, currentPage }: Props) {
  const router = useRouter();
  const [vin, setVin] = useState('');
  const formState = useForm({
    defaultValues: { brand: '', model: '' },
  });
  const brandWatch = formState.watch('brand');
  useEffect(() => {
    if (!brandWatch) {
      formState.resetField('model');
    }
  }, [brandWatch, formState.resetField]);
  const onSubmit = (event?: React.BaseSyntheticEvent) => {
    formState.handleSubmit(({ brand }) => {
      router.push(
        {
          pathname: router.pathname,
          query: { brand, page: currentPage || 1 },
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
          value={formState.getValues('brand')}
          onSelect={(value) => formState.setValue('brand', value)}
        />
        <ModelAutocomplete
          brand={formState.getValues('brand')}
          model={formState.getValues('model')}
          onSelect={(value) => {
            return formState.setValue('model', value);
          }}
        />
        <Button type="submit">Hledat</Button>
      </form>
      {vehicles && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {vehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  href={`/vehicle?${new URLSearchParams({
                    id: String(vehicle.id),
                  })}`}
                >
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {vehicle.tovarni_znacka}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {vehicle.typ}
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {currentPage !== null && (
        <VehiclePagination
          currentPage={currentPage}
          getPageLink={(page) => {
            const { brand } = formState.getValues();
            const urlParams = new URLSearchParams({
              page: String(page),
              brand,
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
  const { page, brand } = context.query;
  if (!page || !brand) {
    return {
      props: { vehicles: null, currentPage: null },
    };
  }

  const currentPage = parseInt(page as string, 10) || 1;
  const brandStr = [brand].flat()[0] || '';

  const vehicles = await prisma.registrations.findMany({
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    where: { tovarni_znacka: brandStr },
  });

  return {
    props: {
      vehicles: vehicles.map(serializeRegistration),
      currentPage,
    },
  };
};
