import { useEffect } from 'react';
import useSWR from 'swr/immutable';
import type { ZodType } from 'zod';

type Decoder<T> = ZodType<T>;

export type FetchAction<T> =
  | {
      url: string;
      decoder: ZodType<T>;
      init?: RequestInit;
    }
  | { url: null };

const fetcher = <T>(
  decoder: Decoder<T> | void,
  signal: AbortSignal,
  init?: RequestInit
) => {
  return (url: string): Promise<T> => {
    if (!decoder) return Promise.resolve(undefined!);
    return fetch(url, { ...init, signal })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((msg) => Promise.reject(new Error(msg)));
        }
        return res.json().then(decoder.parse);
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return undefined!;
        throw error;
      });
  };
};

export default function useFetch<T>(props: FetchAction<T>) {
  const abortController = new AbortController();
  useEffect(() => {
    return () => abortController.abort();
  }, [props.url]);
  return useSWR<T, Error>(
    props.url,
    fetcher(
      'decoder' in props ? props.decoder : undefined,
      abortController.signal,
      'init' in props ? props.init : undefined
    )
  );
}
