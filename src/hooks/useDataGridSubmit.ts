import { useState } from 'react';
import { useRouter } from 'next/router';

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
    const query = Object.fromEntries(
      entries.filter(([, value]) =>
        ['', null, undefined].every((val) => value !== val)
      )
    );
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
