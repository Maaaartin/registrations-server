import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { prisma } from '../../prisma';
import { useRouter } from 'next/router';
import BrandAutocomplete from '../../internals/components/BrandAutocomplete';
import { useForm } from 'react-hook-form';
import {
  SerializableRegistration,
  serializeRegistration,
} from '../../util/registrations';
import VehiclePagination from '../../internals/components/VehiclePagination';

type Props = {
  vehicles: SerializableRegistration[] | null;
  currentPage: number | null;
};

export default function Search({ vehicles, currentPage }: Props) {
  const router = useRouter();
  const [vin, setVin] = useState('');
  const formState = useForm({
    defaultValues: { brand: '', page: currentPage },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search/${vin}`);
        }}
      >
        <TextField
          value={vin}
          onChange={(e) => {
            setVin(e.target.value);
          }}
        ></TextField>
      </form>
      <form
        onSubmit={(event) => {
          formState.handleSubmit(({ brand }) => {
            router.push(
              {
                pathname: router.pathname,
                query: { brand, page: 1 },
              },
              undefined,
              { scroll: false }
            );
          })(event);
        }}
      >
        <BrandAutocomplete
          value={formState.getValues('brand')}
          onSelect={(value) => formState.setValue('brand', value)}
        />
        <Button type="submit">Hledat</Button>
      </form>
      {currentPage !== null && (
        <VehiclePagination
          currentPage={currentPage}
          setPage={(page) => formState.setValue('page', page)}
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

  // Convert query params to numbers (with defaults)
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
