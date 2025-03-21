import type { FetchAction } from '../hooks/useFetch';
import { DValueCountPairs, DNumber, DStringArray } from '../util/decoders';
import type { ValueCountPairs } from '../util/registrations';

export const topBrandsAction: FetchAction<ValueCountPairs> = {
  url: '/api/top-brands',
  decoder: DValueCountPairs
};

export const countAction: FetchAction<number> = {
  url: '/api/count',
  decoder: DNumber
};

export const topCategoriesAction: FetchAction<ValueCountPairs> = {
  url: '/api/top-categories',
  decoder: DValueCountPairs
};

export const topKindsAction: FetchAction<ValueCountPairs> = {
  url: '/api/top-kinds',
  decoder: DValueCountPairs
};

export const topColorsAction: FetchAction<ValueCountPairs> = {
  url: '/api/top-colors',
  decoder: DValueCountPairs
};

export const registrationsPerYearAction: FetchAction<ValueCountPairs> = {
  url: '/api/registrations-per-year',
  decoder: DValueCountPairs
};

function buildQueryUrl(url: string, queryObj: Record<string, string>) {
  return `${url}?${new URLSearchParams(queryObj)}`;
}

export const searchBrandsAction = (
  tovarni_znacka: string
): FetchAction<ValueCountPairs> => {
  if (!tovarni_znacka) return topBrandsAction;
  return {
    url: buildQueryUrl('/api/search-brands', { tovarni_znacka }),
    decoder: DValueCountPairs
  };
};

const topModelsAction = (tovarni_znacka: string): FetchAction<string[]> => ({
  url: buildQueryUrl('/api/top-models', { tovarni_znacka }),
  decoder: DStringArray
});

export const searchModelsAction = (
  tovarni_znacka: string,
  typ: string
): FetchAction<string[]> => {
  if (!tovarni_znacka) return { url: null };
  if (!typ) return topModelsAction(tovarni_znacka);
  return {
    url: buildQueryUrl('/api/search-models', { tovarni_znacka, typ }),
    decoder: DStringArray
  };
};
