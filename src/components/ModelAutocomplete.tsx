import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import axios from 'axios';
import { useCacheContext } from '../context/cache';
import useDebounce from '../hooks/useDebounce';
import { DStringArray } from '../util/decoders';

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
  const cache = useCacheContext();
  const [topModelsPerBrand, setTopModelsPerBrand] = cache.topModelsPerBrand;
  const [modelSearch, setModelSearch] = cache.modelSearch;
  const [models, setModels] = useState<string[]>([]);
  const [searchModel, setSearchModel] = useState('');
  const searchModelDebounced = useDebounce(searchModel, 300);

  const request = useRequest({
    url: '/api/search-models',
    decoder: DStringArray
  });
  useEffect(() => {
    if (tovarni_znacka && !topModelsPerBrand[tovarni_znacka]?.length) {
      axios
        .get('/api/top-models?' + new URLSearchParams({ tovarni_znacka }))
        .then((res) => {
          const result = DStringArray.parse(res.data);
          setTopModelsPerBrand({
            ...topModelsPerBrand,
            [tovarni_znacka]: result
          });
          setModels(result);
        });
    }
  }, [tovarni_znacka]);
  useEffect(() => {
    if (request.value && searchModelDebounced) {
      setModels(request.value);
      setModelSearch({
        ...modelSearch,
        [tovarni_znacka]: {
          ...modelSearch[tovarni_znacka],
          [searchModelDebounced]: request.value
        }
      });
    }
  }, [request.value, tovarni_znacka, searchModelDebounced]);
  useEffect(() => {
    if (!tovarni_znacka) return;
    if (searchModelDebounced) {
      if (modelSearch[tovarni_znacka]?.[searchModelDebounced]) {
        setModels(modelSearch[tovarni_znacka][searchModelDebounced]);
      } else {
        const query = new URLSearchParams({
          tovarni_znacka,
          typ: searchModelDebounced
        });
        request.run({ query });
      }
    } else if (topModelsPerBrand[tovarni_znacka]) {
      setModels(topModelsPerBrand[tovarni_znacka]);
    }
  }, [tovarni_znacka, searchModelDebounced]);
  return (
    <Autocomplete
      disabled={disabled}
      disablePortal
      options={models}
      sx={{ width: 300 }}
      loading={request.loading}
      renderInput={(params) => <TextField {...params} label="Model" />}
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
