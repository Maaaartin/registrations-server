import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import AutocompleteBase from './AutocompleteBase';
import useFetch from '../hooks/useFetch';
import { searchModelsAction } from '../actions';

export default function ModelAutocomplete({
  tovarni_znacka,
  typ,
  onSelect,
  disabled
}: {
  tovarni_znacka: string;
  typ: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (tovarni_znacka: string) => void;
  disabled?: boolean;
}) {
  const [searchModel, setSearchModel] = useState('');
  const searchModelDebounced = useDebounce(searchModel, 300);
  const { data, isLoading } = useFetch(
    searchModelsAction(tovarni_znacka, searchModelDebounced)
  );

  return (
    <AutocompleteBase
      label="Typ"
      disabled={disabled}
      options={data || []}
      loading={isLoading}
      inputValue={searchModel}
      onInputChange={(event, newInputValue) => {
        setSearchModel(newInputValue);
      }}
      value={typ}
      onBlur={() => {
        if (!searchModel) onSelect('');
      }}
      onChange={(event, value) => {
        if (value) {
          onSelect(value);
        }
      }}
    />
  );
}
