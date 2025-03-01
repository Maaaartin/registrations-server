import { Autocomplete, TextField } from '@mui/material';
import zod from 'zod';
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import axios from 'axios';
import { useCacheContext } from '../context/cache';
import useDebounce from '../hooks/useDebounce';

export default function BrandAutocomplete({
  value,
  onSelect,
  disabled
}: {
  value: string;
  onSelect: (brand: string) => void;
  disabled?: boolean;
}) {
  const cache = useCacheContext();
  const [topBrands, setTopBrands] = cache.topBrands;
  const [brandSearch, setBrandSearch] = cache.brandSearch;
  const [brands, setBrands] = useState<string[]>([]);
  const [searchBrand, setSearchBrand] = useState('');
  const searchBrandDebounced = useDebounce(searchBrand, 300);

  const request = useRequest({
    url: '/api/search-brands',
    decoder: zod.string().array()
  });
  useEffect(() => {
    if (!topBrands.length) {
      axios.get('/api/top-brands').then((res) => {
        const result = zod.string().array().parse(res.data);
        setTopBrands(result);
      });
    }
  }, [topBrands, setTopBrands]);
  useEffect(() => {
    if (request.value && searchBrandDebounced) {
      setBrands(request.value);
      setBrandSearch({ ...brandSearch, [searchBrandDebounced]: request.value });
    }
  }, [request.value, searchBrandDebounced, setBrands, setBrandSearch]);
  useEffect(() => {
    if (searchBrandDebounced) {
      if (brandSearch[searchBrandDebounced]) {
        setBrands(brandSearch[searchBrandDebounced]);
      } else {
        const query = new URLSearchParams({ brand: searchBrandDebounced });
        request.run({ query });
      }
    } else {
      setBrands(topBrands);
    }
  }, [searchBrandDebounced, brandSearch, topBrands]);
  return (
    <Autocomplete
      freeSolo
      disabled={disabled}
      disablePortal
      options={brands}
      sx={{ width: 300 }}
      loading={request.loading}
      renderInput={(params) => <TextField {...params} label="Značka" />}
      inputValue={searchBrand}
      onInputChange={(event, newInputValue) => {
        setSearchBrand(newInputValue);
      }}
      value={value}
      onBlur={() => {
        if (!searchBrand) onSelect('');
      }}
      onChange={(event, value) => {
        if (value) {
          onSelect(value);
        }
      }}
    />
  );
}
