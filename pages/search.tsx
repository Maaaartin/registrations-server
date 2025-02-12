import { Autocomplete, TextField } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import useDebounce from '../hooks/useDebounce';
import { prisma } from '../prisma';
import { DatePicker } from '@mui/x-date-pickers';

export default function Search({ error, registration }: any) {
  return <DatePicker></DatePicker>;
}
