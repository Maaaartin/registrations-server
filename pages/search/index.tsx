import { Autocomplete, Button, TextField } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import useDebounce from '../../hooks/useDebounce';
import { prisma } from '../../prisma';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import BrandAutocomplete from '../../internals/components/BrandAutocomplete';
import { useForm } from 'react-hook-form';
import useRequest from '../../hooks/useRequest';

export default function Search() {
  const router = useRouter();
  const [vin, setVin] = useState('');
  const formState = useForm({ defaultValues: { brand: '' } });
  const request = useRequest({ url: '/api/find-vehicles' });

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
            request.run({ query: new URLSearchParams({ brand, page: '1' }) });
          })(event);
        }}
      >
        <BrandAutocomplete
          value={formState.getValues('brand')}
          onSelect={(value) => formState.setValue('brand', value)}
        />
        <Button type="submit">Hledat</Button>
      </form>
    </div>
  );
}
