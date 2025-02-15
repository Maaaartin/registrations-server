import { Autocomplete, TextField } from '@mui/material';
import zod, { ZodError } from 'zod';
import React, { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import axios from 'axios';
import { useCacheContext } from '../../context/cache';
import useDebounce from '../../hooks/useDebounce';

export default function BrandAutocomplete() {
  const cache = useCacheContext();
  const [topBrands, setTopBrands] = cache.topBrands;
  const [brandSearch, setBrandSearch] = cache.brandSearch;
  const [brands, setBrands] = useState<string[]>([]);
  const [searchBrand, setSearchBrand] = useState('');
  const searchBrandDebounced = useDebounce(searchBrand, 300);

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
  }, [topBrands]);
  useEffect(() => {
    if (request.value) {
      setBrands(request.value);
    }
  }, request.value);
  useEffect(() => {
    if (searchBrandDebounced) {
      const query = new URLSearchParams({ brand: searchBrandDebounced });
      request.run({ query });
    } else {
      setBrands(topBrands);
    }
  }, [searchBrandDebounced]);
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
