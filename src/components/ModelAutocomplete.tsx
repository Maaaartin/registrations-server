import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useRequest from '../hooks/useRequest';
import axios from 'axios';
import { useCacheContext } from '../context/cache';
import useDebounce from '../hooks/useDebounce';
import { DStringArray } from '../util/decoders';

export default function ModelAutocomplete({
  brand,
  model,
  onSelect,
  disabled
}: {
  brand: string;
  model: string;
  onSelect: (brand: string) => void;
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
    if (brand && !topModelsPerBrand[brand]?.length) {
      axios
        .get('/api/top-models?' + new URLSearchParams({ brand }))
        .then((res) => {
          const result = DStringArray.parse(res.data);
          setTopModelsPerBrand({
            ...topModelsPerBrand,
            [brand]: result
          });
        });
    }
  }, [brand, topModelsPerBrand, setTopModelsPerBrand]);
  useEffect(() => {
    if (request.value && searchModelDebounced) {
      setModels(request.value);
      setModelSearch({
        ...modelSearch,
        [brand]: {
          ...modelSearch[brand],
          [searchModelDebounced]: request.value
        }
      });
    }
  }, [
    request.value,
    brand,
    modelSearch,
    searchModelDebounced,
    setModels,
    setModelSearch
  ]);
  useEffect(() => {
    if (!brand) return;
    if (searchModelDebounced) {
      if (modelSearch[brand]?.[searchModelDebounced]) {
        setModels(modelSearch[brand][searchModelDebounced]);
      } else {
        const query = new URLSearchParams({
          brand,
          model: searchModelDebounced
        });
        request.run({ query });
      }
    } else if (topModelsPerBrand[brand]) {
      setModels(topModelsPerBrand[brand]);
    }
  }, [request, brand, searchModelDebounced, modelSearch, topModelsPerBrand]);
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
      value={model}
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
