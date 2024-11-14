import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type ColorData = { value: string; count: number }[];
const StatsContext = createContext<{
  count: number | void;
  setCount: (count: number) => void;
  brands: string[] | void;
  setBrands: (brands: string[]) => void;
  colors: ColorData | void;
  setColors: (colors: ColorData) => void;
}>(null!);

export const StatsProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState<number>();
  const [brands, setBrands] = useState<string[]>();
  const [colors, setColors] = useState<ColorData>();
  return (
    <StatsContext.Provider
      value={{ count, setCount, brands, setBrands, colors, setColors }}
    >
      {children}
    </StatsContext.Provider>
  );
};

export const useStatsContext = () => useContext(StatsContext);
