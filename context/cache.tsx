import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type StateAction<T> = [T, Dispatch<SetStateAction<T>>];

const CacheContext = createContext<{
  topBrands: StateAction<string[]>;
  brandSearch: StateAction<Record<string, string[]>>;
}>(null!);

export const CacheContextProvider = ({ children }: PropsWithChildren) => {
  const topBrands = useState<string[]>([]);
  const brandSearch = useState<Record<string, string[]>>({});
  return (
    <CacheContext.Provider
      value={{
        topBrands,
        brandSearch,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const useCacheContext = () => useContext(CacheContext);
