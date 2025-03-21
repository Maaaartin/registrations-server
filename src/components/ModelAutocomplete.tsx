import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import AutocompleteBase from './AutocompleteBase';
import useFetch from '../hooks/useFetch';
import { searchModelsAction, topModelsAction } from '../actions';

export default function ModelAutocomplete({
  tovarni_znacka,
  typ,
  onSelect,
  disabled
}: {
  tovarni_znacka: string;
  typ: string;
  onSelect: (tovarni_znacka: string) => void;
  disabled?: boolean;
}) {
  const [searchModel, setSearchModel] = useState('');
  const searchModelDebounced = useDebounce(searchModel, 300);
  const topModelsFetch = useFetch(
    topModelsAction,
    new URLSearchParams({ tovarni_znacka })
  );
  const searchModelsFetch = useFetch(
    searchModelsAction,
    new URLSearchParams({
      tovarni_znacka,
      typ: searchModelDebounced
    })
  );
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    if (!searchModelDebounced && topModelsFetch.data) {
      setModels(topModelsFetch.data);
    } else if (searchModelsFetch.data) {
      setModels(searchModelsFetch.data);
    }
  }, [searchModelDebounced, topModelsFetch.data, searchModelsFetch.data]);

  return (
    <AutocompleteBase
      label="Typ"
      disabled={disabled}
      options={models}
      loading={topModelsFetch.isLoading || searchModelsFetch.isLoading}
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
