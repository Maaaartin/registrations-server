import { unstable_cache } from 'next/cache';
import prisma from '.';
import type { Prisma } from './client/default';
import queries from './client/sql';
import type { Pohon } from '../src/content/discover';

export async function count_() {
  const [result] = await prisma.$queryRawTyped(queries.count());
  return Number(result.count);
}

export async function registrationsPerYear_() {
  const lastYear = new Date().getFullYear() - 1;
  const result = await prisma.$queryRawTyped(
    queries.registrationCountsByYear(1920, lastYear)
  );
  return result.map((row) => ({
    value: String(row.year),
    count: Number(row.count)
  }));
}

export async function topBrands_() {
  const result = await prisma.$queryRawTyped(queries.topBrands());
  return result.map((value) => ({
    value: String(value.tovarni_znacka),
    count: Number(value.count)
  }));
}

export async function topColors_() {
  const data = await prisma.$queryRawTyped(queries.topColors());
  return data.map((value) => ({
    value: value.barva as string,
    count: Number(value.count)
  }));
}

export async function topKinds_() {
  const data = await prisma.$queryRawTyped(queries.topKinds(10));
  return data.map((value) => ({
    value: value.druh_vozidla as string,
    count: Number(value.count)
  }));
}

export async function topCategories_() {
  const data = await prisma.$queryRawTyped(queries.topCategories(10));
  return data.map((value) => ({
    value: value.kategorie_vozidla as string,
    count: Number(value.count)
  }));
}

export async function searchBrands_(brand: string) {
  const result = await prisma.$queryRawTyped(queries.searchBrands(brand, 10));
  return result.map((value) => ({
    value: String(value.tovarni_znacka),
    count: Number(value.count)
  }));
}

export async function searchModels_(brand: string, model: string) {
  const result = await prisma.$queryRawTyped(
    queries.searchTypesForBrand(brand, model, 10)
  );
  return result.map((value) => String(value.typ));
}

export async function topTypesForBrand_(brand: string) {
  const result = await prisma.$queryRawTyped(
    queries.topTypesForBrand(brand, 10)
  );
  return result.map((value) => String(value.typ));
}

export async function topFuels_() {
  const data = await prisma.$queryRawTyped(queries.topFuels(10));
  return data.map((value) => ({
    value: value.palivo as string,
    count: Number(value.count)
  }));
}

export async function countriesImports_() {
  const data = await prisma.$queryRawTyped(queries.topCountriesImports());
  return data.map((value) => ({
    value: value.country as string,
    count: Number(value.count)
  }));
}

export type DiscoverVehiclesParams = {
  tovarni_znacka: string;
  typ: string;
  datum_prvni_registrace_od: Date | null;
  datum_prvni_registrace_do: Date | null;
  pohon: Pohon;
  pagination?: {
    page: number;
    pageSize: number;
  };
};

export function discoverVehiclesBaseQuery({
  tovarni_znacka,
  typ,
  datum_prvni_registrace_od,
  datum_prvni_registrace_do,
  pohon
}: DiscoverVehiclesParams): {
  where: Prisma.registrationsWhereInput;
  orderBy: Prisma.registrationsOrderByWithRelationInput;
} {
  const query = [
    {
      key: 'datum_1_registrace',
      value: { gte: datum_prvni_registrace_od }
    },
    {
      key: 'datum_1_registrace',
      value: { lte: datum_prvni_registrace_do }
    }
  ]
    .filter(({ value }) => Object.values(value).filter(Boolean).length)
    .map(({ key, value }) => ({ [key]: value }));
  return {
    where: {
      ...(tovarni_znacka && { tovarni_znacka }),
      ...(typ && { typ }),
      AND: query,
      ...(pohon === 'electric' && { plne_elektricke_vozidlo: true }),
      ...(pohon === 'hybrid' && { hybridni_vozidlo: true })
    },
    orderBy: {
      id: 'asc'
    }
  };
}

export const discoverCount = unstable_cache(
  (params: DiscoverVehiclesParams) =>
    prisma.registrations.count(discoverVehiclesBaseQuery(params)),
  ['discoverCount'],
  { revalidate: 3600, tags: ['discoverCount'] }
);
