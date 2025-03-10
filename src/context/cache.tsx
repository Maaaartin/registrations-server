import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { ValueCountPairs } from '../util/registrations';

type StateAction<T> = [T, Dispatch<SetStateAction<T>>];
const CacheContext = createContext<{
  topBrands: StateAction<ValueCountPairs>;
  brandSearch: StateAction<Record<string, string[]>>;
  topModelsPerBrand: StateAction<Record<string, string[]>>;
  modelSearch: StateAction<Record<string, Record<string, string[]>>>;
  count: StateAction<number>;
  topColors: StateAction<ValueCountPairs>;
  registrationsPerYear: StateAction<ValueCountPairs>;
  topKinds: StateAction<ValueCountPairs>;
}>(null!);

export const CacheContextProvider = ({ children }: PropsWithChildren) => {
  const topBrands = useState<ValueCountPairs>([]);
  const brandSearch = useState<Record<string, string[]>>({});
  const topModelsPerBrand = useState<Record<string, string[]>>({});
  const modelSearch = useState<Record<string, Record<string, string[]>>>({});
  const count = useState(0);
  const topColors = useState<ValueCountPairs>([]);
  const registrationsPerYear = useState<ValueCountPairs>([]);
  const topKinds = useState<ValueCountPairs>([]);
  return (
    <CacheContext.Provider
      value={{
        topBrands,
        brandSearch,
        topModelsPerBrand,
        modelSearch,
        count,
        topColors,
        registrationsPerYear,
        topKinds
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export const useCacheContext = () => useContext(CacheContext);
