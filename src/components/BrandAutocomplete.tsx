import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import AutocompleteBase from './AutocompleteBase';
import useFetch from '../hooks/useFetch';
import { searchBrandsAction, topBrandsAction } from '../actions';

export default function BrandAutocomplete({
  value,
  onSelect,
  disabled
}: {
  value: string;
  onSelect: (brand: string) => void;
  disabled?: boolean;
}) {
  const [searchBrand, setSearchBrand] = useState('');
  const searchBrandDebounced = useDebounce(searchBrand, 300);
  const topBrandsFetch = useFetch(topBrandsAction);
  const brandSearchFetch = useFetch(
    searchBrandsAction,
    new URLSearchParams({
      tovarni_znacka: searchBrandDebounced
    })
  );
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (!searchBrandDebounced && topBrandsFetch.data) {
      setBrands(topBrandsFetch.data.map(({ value }) => value));
    } else if (brandSearchFetch.data) {
      setBrands(brandSearchFetch.data);
    }
  }, [searchBrandDebounced, topBrandsFetch.data, brandSearchFetch.data]);

  return (
    <AutocompleteBase
      label="Značka"
      disabled={disabled}
      options={brands}
      loading={topBrandsFetch.isLoading || brandSearchFetch.isLoading}
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
