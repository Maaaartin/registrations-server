import queries from './client/sql';
import prisma from '.';
import type { Pohon } from '../src/content/discover';

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
    queries.searchObchodniOznaceniPerBrand(brand, model || null, 10)
  );
  return result.map((value) => String(value.obchodni_oznaceni));
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
  imported: boolean;
  removed: boolean;
  rok_vyroby_od: number | null;
  rok_vyroby_do: number | null;
  page: number;
  pageSize: number;
};
