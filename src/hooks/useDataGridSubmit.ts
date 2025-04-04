import { useState } from 'react';
import { useRouter } from 'next/router';
import { filterQuery } from '../content/data';

export default function useDataGridSubmit<
  T extends Record<string, string | number | null>
>(initParams: T) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
