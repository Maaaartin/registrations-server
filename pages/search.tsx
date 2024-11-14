import { Autocomplete, TextField } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useSearchContext } from '../context/search';

const BrandAutocomplete = () => {
  const { brand, setBrand, brands, setBrands } = useSearchContext();
  const [brandQuery, setBrandQuery] = useState('');
  const debouncedBrandQuery = useDebounce(brandQuery, 300);

  useEffect(() => {
    if (debouncedBrandQuery) {
      const params = new URLSearchParams({
        brand: debouncedBrandQuery,
      });
      const abortController = new AbortController();
      axios
        .get(`api/top-brands?${params}`, { signal: abortController.signal })
        .then((res) => {
          setBrands(res.data);
        })
        .catch((error) => {
          if (error.code === AxiosError.ERR_CANCELED) {
            return;
          }
          throw error;
        });
      return () => abortController.abort();
    }
  }, [debouncedBrandQuery]);
  return (
    <Autocomplete
      disablePortal
      value={brand}
      onChange={(e, value) => {
        setBrand(value);
      }}
      onInputChange={(e, value) => {
        setBrandQuery(value);
      }}
      options={brands}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Značka" />}
    />
  );
};

const ModelAutocomplete = () => {
  const { brand, model, setModel, models, setModels } = useSearchContext();
  const [modelQuery, setModelQuery] = useState('');
  const debouncedBrandQuery = useDebounce(modelQuery, 300);

  useEffect(() => {
    if (brand) {
      const params = new URLSearchParams({
        brand,
      });
      const abortController = new AbortController();
      axios
        .get(`api/top-models?${params}`, { signal: abortController.signal })
        .then((res) => {
          setModels(res.data);
        })
        .catch((error) => {
          if (error.code === AxiosError.ERR_CANCELED) {
            return;
          }
          throw error;
        });
      return () => abortController.abort();
    }
  }, [brand]);
  useEffect(() => {
    if (brand && debouncedBrandQuery) {
      const params = new URLSearchParams({
        brand,
        model: debouncedBrandQuery,
      });
      const abortController = new AbortController();
      axios
        .get(`api/top-models?${params}`, { signal: abortController.signal })
        .then((res) => {
          setModels(res.data);
        })
        .catch((error) => {
          if (error.code === AxiosError.ERR_CANCELED) {
            return;
          }
          throw error;
        });
      return () => abortController.abort();
    }
  }, [brand, debouncedBrandQuery]);
  return (
    <Autocomplete
      disabled={!brand}
      disablePortal
      value={model}
      onChange={(e, value) => {
        setModel(value);
      }}
      onInputChange={(e, value) => {
        setModelQuery(value);
      }}
      options={models}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Model" />}
    />
  );
};

export default function Search() {
  const { setBrands } = useSearchContext();
  useEffect(() => {
    const abortController = new AbortController();
    axios
      .get(`api/top-brands`, { signal: abortController.signal })
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        if (error.code === AxiosError.ERR_CANCELED) {
          return;
        }
        throw error;
      });
    return () => abortController.abort();
  }, []);
  return (
    <>
      <BrandAutocomplete />
      <ModelAutocomplete></ModelAutocomplete>
    </>
  );
}
