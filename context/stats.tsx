import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type ColorData = { value: string; count: number }[];
const StatsContext = createContext<{
  count: number | void;
  setCount: (count: number) => void;
  brands: string[] | void;
  setBrands: (brands: string[]) => void;
  colors: ColorData | void;
  setColors: (colors: ColorData) => void;
  co2: number | void;
  setCo2: (co2: number) => void;
}>(null!);

export const StatsProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState<number>();
  const [brands, setBrands] = useState<string[]>();
  const [colors, setColors] = useState<ColorData>();
  const [co2, setCo2] = useState<number>();
  return (
    <StatsContext.Provider
      value={{
        count,
        setCount,
        brands,
        setBrands,
        colors,
        setColors,
        co2,
        setCo2,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStatsContext = () => useContext(StatsContext);
