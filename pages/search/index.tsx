import { Autocomplete, TextField } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import useDebounce from '../../hooks/useDebounce';
import { prisma } from '../../prisma';
import { DatePicker } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';

export default function Search({ error, registration }: any) {
  const router = useRouter();
  const [vin, setVin] = useState('');
  const [brand, setBrand] = useState('');
  return (
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
      <TextField
        value={brand}
        onChange={(e) => {
          const query = new URLSearchParams({ brand: e.target.value });
          fetch('/api/search-brands?' + query.toString()).then((result) => {
            console.log(result);
          });
          setBrand(e.target.value);
        }}
      ></TextField>
    </form>
  );
}
