import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import AutocompleteBase from './AutocompleteBase';
import useFetch from '../hooks/useFetch';
import { searchFuelsAction } from '../actions';

export default function FuelAutocomplete({
  value,
  onSelect,
  disabled
}: {
  value: string;
  onSelect: (fuel: string) => void;
  disabled?: boolean;
}) {
  const [searchFuel, setSearchFuel] = useState('');
  const searchFuelDebounced = useDebounce(searchFuel, 300);
  const { data, isLoading } = useFetch(searchFuelsAction(searchFuelDebounced));
  const fuels = data ? data.map(({ value }) => value) : [];

  return (
    <AutocompleteBase
      label="Palivo"
      disabled={disabled}
      options={fuels}
      loading={isLoading}
      inputValue={searchFuel}
      onInputChange={(event, newInputValue) => {
        setSearchFuel(newInputValue);
      }}
      value={value}
      onBlur={() => {
        if (!searchFuel) onSelect('');
      }}
      onChange={(event, value) => {
        if (value) {
          onSelect(value);
        }
      }}
    />
  );
}
