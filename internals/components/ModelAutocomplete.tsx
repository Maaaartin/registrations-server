import { Autocomplete, TextField } from '@mui/material';
import zod from 'zod';
import React, { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import axios from 'axios';
import { useCacheContext } from '../../context/cache';
import useDebounce from '../../hooks/useDebounce';

export default function ModelAutocomplete({
  brand,
  model,
  onSelect,
}: {
  brand: string;
  model: string;
  onSelect: (brand: string) => void;
}) {
  const cache = useCacheContext();
  const [topModelsPerBrand, setTopModelsPerBrand] = cache.topModelsPerBrand;
  const [modelSearch, setModelSearch] = cache.modelSearch;
  const [models, setModels] = useState<string[]>([]);
  const [searchModel, setSearchModel] = useState('');
  const searchModelDebounced = useDebounce(searchModel, 300);

  const request = useRequest({
    url: '/api/search-models',
    decoder: zod.string().array(),
  });
  useEffect(() => {
    brand &&
      !topModelsPerBrand[brand]?.length &&
      axios
        .get('/api/top-models?' + new URLSearchParams({ brand }))
        .then((res) => {
          const result = zod.string().array().parse(res.data);
          setTopModelsPerBrand({
            ...topModelsPerBrand,
            [brand]: result,
          });
        });
  }, [brand, topModelsPerBrand, setTopModelsPerBrand]);
  useEffect(() => {
    if (request.value && searchModelDebounced) {
      setModels(request.value);
      setModelSearch({
        ...modelSearch,
        [brand]: {
          ...modelSearch[brand],
          [searchModelDebounced]: request.value,
        },
      });
    }
  }, [request.value, searchModelDebounced, setModels, setModelSearch]);
  useEffect(() => {
    if (!brand) return;
    if (searchModelDebounced) {
      if (modelSearch[brand]?.[searchModelDebounced]) {
        setModels(modelSearch[brand][searchModelDebounced]);
      } else {
        const query = new URLSearchParams({
          brand,
          model: searchModelDebounced,
        });
        request.run({ query });
      }
    } else {
      setModels(topModelsPerBrand[brand]);
    }
  }, [brand, searchModelDebounced, modelSearch, topModelsPerBrand]);
  return (
    <Autocomplete
      disablePortal
      options={models}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Model" />}
      inputValue={searchModel}
      onInputChange={(event, newInputValue) => {
        setSearchModel(newInputValue);
      }}
      value={model}
      onChange={(event, value) => {
        onSelect(value || '');
      }}
    />
  );
}
