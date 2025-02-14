import { Autocomplete, TextField } from '@mui/material';
import zod, { ZodError } from 'zod';
import React, { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import axios from 'axios';

export default function BrandAutocomplete() {
  const [brands, setBrands] = useState<string[]>([]);
  const [searchBrand, setSearchBrand] = useState('');
  const [topBrands, setTopBrands] = useState<string[]>([]);

  const request = useRequest({
    url: '/api/search-brands',
    decoder: zod.string().array(),
  });
  useEffect(() => {
    !topBrands.length &&
      axios.get('/api/top-brands').then((res) => {
        const result = zod.string().array().parse(res.data);
        setTopBrands(result);
      });
  }, []);
  useEffect(() => {
    if (request.value) {
      setBrands(request.value);
    }
  }, request.value);
  useEffect(() => {
    if (searchBrand) {
      const query = new URLSearchParams({ brand: searchBrand });
      request.run({ query });
    } else {
      setBrands(topBrands);
    }
  }, [searchBrand]);
  return (
    <Autocomplete
      disablePortal
      options={brands}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Brand" />}
      inputValue={searchBrand}
      onInputChange={(event, newInputValue) => {
        setSearchBrand(newInputValue);
      }}
    />
  );
}
