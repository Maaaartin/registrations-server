import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type zod from 'zod';
import { ZodError } from 'zod';

type UseRequestProps<T> = {
  url: string;
  decoder?: zod.ZodType<T>;
};
type UseRequestRunProps<D> = {
  query?: URLSearchParams;
  config?: AxiosRequestConfig<D>;
};
export type UseRequestHook<T, D> = (
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
export default function useRequest<T, D = Record<string, string>>({
  url,
  decoder
}: UseRequestProps<T>): UseRequestHook<T, D> {
  const [value, setValue] = useState<T>();
  const [error, setError] = useState<AxiosError<T, D> | ZodError<T>>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const abortController = useRef(new AbortController());
  const run = useCallback(
    (props?: UseRequestRunProps<D>) => {
      setLoading(true);
      axios
        .get(`${url}${props?.query ? `?${props.query}` : ''}`, {
          ...props?.config,
          signal: abortController.current.signal
        })
        .then((res) => {
          if (decoder) {
            setValue(decoder.parse(res.data as any));
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
    [url, decoder]
  );
  useEffect(() => {
    if (loading) {
      setValue(undefined);
      setError(undefined);
    }
  }, [loading]);
  useEffect(() => {
    const controller = abortController.current;
    return () => controller.abort();
  }, [run]);
  const hook = useMemo(
    () => ({ value, error, loading, run }) as UseRequestHook<T, D>,
    [value, error, loading, run]
  );

  return hook;
}
