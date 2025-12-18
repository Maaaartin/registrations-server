import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import AutocompleteBase from './AutocompleteBase';
import useFetch from '../hooks/useFetch';
import { searchBrandsAction } from '../actions';

export default function BrandAutocomplete({
  value,
  onSelect,
  disabled
}: {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (brand: string) => void;
  disabled?: boolean;
}) {
  const [searchBrand, setSearchBrand] = useState('');
  const searchBrandDebounced = useDebounce(searchBrand, 300);
  const { data, isLoading } = useFetch(
    searchBrandsAction(searchBrandDebounced)
  );
  const brands = data ? data.map(({ value }) => value) : [];

  return (
    <AutocompleteBase
      label="Značka"
      disabled={disabled}
      options={brands}
      loading={isLoading}
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
