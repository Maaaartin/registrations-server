import useSWR from 'swr/immutable';
import type { ZodType } from 'zod';

type Decoder<T> = ZodType<T>;

export type FetchAction<T> =
  | {
      url: string;
      decoder: ZodType<T>;
    }
  | { url: null };

const fetcher = <T>(decoder: Decoder<T> | void) => {
  return (url: string): Promise<T> => {
    if (!decoder) return Promise.resolve(undefined!);
    return fetch(url).then((res) => {
      if (!res.ok) {
        return res.text().then((msg) => Promise.reject(new Error(msg)));
      }
      return res.json().then(decoder.parse);
    });
  };
};

export default function useFetch<T>(props: FetchAction<T>) {
  return useSWR<T, Error>(
    props.url,
    fetcher('decoder' in props ? props.decoder : undefined)
  );
}
