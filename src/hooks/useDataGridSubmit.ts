import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { filterQuery } from '../content/data';
import { useSearchParams } from 'next/navigation';
import { useLoading } from './useLoading';

export default function useDataGridSubmit<
  T extends Record<string, string | number | null | boolean>
>(initParams: T) {
  const { loading, setLoading } = useLoading();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    setLoading(false);
  }, [searchParams]);
  const onSubmit = (params: Partial<T>) => {
    setLoading(true);
    const entries = Object.entries(initParams).map(([key, value]) => [
      key,
      params[key] ?? value
    ]);
    const query = filterQuery(entries as [string, (typeof entries)[0][1]][]);
    return router
      .push(
        {
          pathname: router.pathname,
          query
        },
        undefined,
        { scroll: false }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return { onSubmit, loading };
}
