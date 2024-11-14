import { createContext, PropsWithChildren, useContext, useState } from 'react';

const SearchContext = createContext<{
  brand: string | null;
  setBrand: (brand: string | null) => void;
  brands: string[];
  setBrands: (brands: string[]) => void;
  model: string | null;
  setModel: (model: string | null) => void;
  models: string[];
  setModels: (models: string[]) => void;
}>(null!);

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [brand, setBrand] = useState<string | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [model, setModel] = useState<string | null>(null);
  return (
    <SearchContext.Provider
      value={{
        brand,
        setBrand,
        brands,
        setBrands,
        model,
        setModel,
        models,
        setModels,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
