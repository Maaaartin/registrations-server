import React, { createContext, useContext, useMemo, useState } from 'react';

type LoadingContextValue = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

const LoadingProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

const useLoading = (): LoadingContextValue => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return ctx;
};

export { LoadingProvider, useLoading };
