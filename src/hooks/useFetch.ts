import useSWR from 'swr/immutable';
import type zod from 'zod';

type Decoder<T> = zod.ZodType<T>;

export type FetchAction<T> = {
  url: string;
  decoder: zod.ZodType<T>;
};

const fetcher = <T>(decoder: Decoder<T>) => {
  return (url: string) => {
    return fetch(url).then((res) => {
      if (!res.ok) {
        return res.text().then((msg) => Promise.reject(new Error(msg)));
      }
      return res.json().then(decoder.parse);
    });
  };
};

export default function useFetch<T>(
  props: FetchAction<T>,
  query?: URLSearchParams
) {
  const url = query ? `${props.url}?${query}` : props.url;
  const hook = useSWR<T, Error>(url, fetcher(props.decoder));
  return hook;
}
