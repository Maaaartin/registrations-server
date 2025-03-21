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

export const searchBrandsAction: FetchAction<string[]> = {
  url: '/api/search-brands',
  decoder: DStringArray
};

export const topModelsAction: FetchAction<string[]> = {
  url: '/api/top-models',
  decoder: DStringArray
};

export const searchModelsAction: FetchAction<string[]> = {
  url: '/api/search-models',
  decoder: DStringArray
};
