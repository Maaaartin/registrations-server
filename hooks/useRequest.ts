import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import zod, { ZodError } from 'zod';

type UseRequestProps<T> = {
  url: string;
  decoder?: zod.ZodType<T>;
};
type UseRequestRunProps<D> = {
  query?: URLSearchParams;
  config?: AxiosRequestConfig<D>;
};
type UseRequestResult<T, D> = (
  | {
      value: T;
      error: undefined;
      loading: false;
    }
  | {
      value: undefined;
      error: AxiosError<T, D>;
      loading: false;
    }
  | {
      value: undefined;
      error: undefined;
      loading: true;
    }
) & { run: (props?: UseRequestRunProps<D>) => void };
export default function useRequest<T, D = any>({
  url,
  decoder,
}: UseRequestProps<T>): UseRequestResult<T, D> {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<AxiosError<T, D> | ZodError<T>>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const abortController = new AbortController();
  const run = useCallback(
    (props?: UseRequestRunProps<D>) => {
      setLoading(true);
      axios
        .get(`${url}${props?.query ? `?${props.query}` : ''}`, {
          ...props?.config,
          signal: abortController.signal,
        })
        .then((res) => {
          if (decoder) {
            setValue(decoder.parse(res.data));
          } else {
            setValue(res.data);
          }
        })
        .catch((error) => {
          if (error.code === AxiosError.ERR_CANCELED) {
            return;
          }
          setError(error);
        })
        .finally(() => setLoading(false));
    },
    [url]
  );
  useEffect(() => {
    if (loading) {
      setValue(undefined);
      setError(undefined);
    }
  }, [loading]);
  useEffect(() => {
    return () => abortController.abort();
  }, [run]);

  return { value, error, loading, run } as UseRequestResult<T, D>;
}
