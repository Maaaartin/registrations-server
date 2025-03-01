import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react';

type StateAction<T> = [T, Dispatch<SetStateAction<T>>];
const CacheContext = createContext<{
  topBrands: StateAction<string[]>;
  brandSearch: StateAction<Record<string, string[]>>;
  topModelsPerBrand: StateAction<Record<string, string[]>>;
  modelSearch: StateAction<Record<string, Record<string, string[]>>>;
  count: StateAction<number>;
  topColors: StateAction<{ value: string; count: number }[]>;
  registrationsPerYear: StateAction<{ year: number; count: number }[]>;
}>(null!);

export const CacheContextProvider = ({ children }: PropsWithChildren) => {
  const topBrands = useState<string[]>([]);
  const brandSearch = useState<Record<string, string[]>>({});
  const topModelsPerBrand = useState<Record<string, string[]>>({});
  const modelSearch = useState<Record<string, Record<string, string[]>>>({});
  const count = useState(NaN);
  const topColors = useState<{ value: string; count: number }[]>([]);
  const registrationsPerYear = useState<{ year: number; count: number }[]>([]);
  return (
    <CacheContext.Provider
      value={{
        topBrands,
        brandSearch,
        topModelsPerBrand,
        modelSearch,
        count,
        topColors,
        registrationsPerYear
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const useCacheContext = () => useContext(CacheContext);
