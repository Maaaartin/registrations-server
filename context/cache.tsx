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
  topModelsPerBrand: StateAction<Record<string, string[]>>;
  modelSearch: StateAction<Record<string, Record<string, string[]>>>;
  count: StateAction<number>;
}>(null!);

export const CacheContextProvider = ({ children }: PropsWithChildren) => {
  const topBrands = useState<string[]>([]);
  const brandSearch = useState<Record<string, string[]>>({});
  const topModelsPerBrand = useState<Record<string, string[]>>({});
  const modelSearch = useState<Record<string, Record<string, string[]>>>({});
  const count = useState(NaN);
  return (
    <CacheContext.Provider
      value={{
        topBrands,
        brandSearch,
        topModelsPerBrand,
        modelSearch,
        count,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const useCacheContext = () => useContext(CacheContext);
