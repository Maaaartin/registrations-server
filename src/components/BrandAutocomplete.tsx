import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import axios from 'axios';
import { useCacheContext } from '../context/cache';
import useDebounce from '../hooks/useDebounce';
import { DStringArray, DValueCountPairs } from '../util/decoders';

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
    decoder: DStringArray
  });
  useEffect(() => {
    if (!topBrands.length) {
      axios.get('/api/top-brands').then((res) => {
        const result = DValueCountPairs.parse(res.data);
        setTopBrands(result);
      });
    }
  }, [topBrands, setTopBrands]);

  useEffect(() => {
    if (!searchBrandDebounced) {
      setBrands(topBrands.map(({ value }) => value));
    } else if (brandSearch[searchBrandDebounced]) {
      setBrands(brandSearch[searchBrandDebounced]);
    } else {
      const query = new URLSearchParams({ brand: searchBrandDebounced });
      request.run({ query });
    }
  }, [searchBrandDebounced]);
  useEffect(() => {
    if (request.value && searchBrandDebounced) {
      setBrands(request.value);
      setBrandSearch({ ...brandSearch, [searchBrandDebounced]: request.value });
    }
  }, [request.value, searchBrandDebounced]);

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
