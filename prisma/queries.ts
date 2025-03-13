import prisma from '.';
import queries from './client/sql';

async function count_() {
  const [result] = await prisma.$queryRawTyped(queries.count());
  return Number(result.count);
}

async function registrationsPerYear_() {
  const lastYear = new Date().getFullYear() - 1;
  const result = await prisma.$queryRawTyped(
    queries.registrationCountsByYear(1920, lastYear)
  );
  return result.map((row) => ({
    value: String(row.year),
    count: Number(row.count)
  }));
}

async function topBrands_() {
  const result = await prisma.$queryRawTyped(queries.topBrands());
  return result.map((value) => ({
    value: String(value.tovarni_znacka),
    count: Number(value.count)
  }));
}

async function topColors_() {
  const data = await prisma.$queryRawTyped(queries.topColors());
  return data.map((value) => ({
    value: value.barva as string,
    count: Number(value.count)
  }));
}

async function topKinds_() {
  const data = await prisma.$queryRawTyped(queries.topKinds(10));
  return data.map((value) => ({
    value: value.druh_vozidla as string,
    count: Number(value.count)
  }));
}

async function topCategories_() {
  const data = await prisma.$queryRawTyped(queries.topCategories(10));
  return data.map((value) => ({
    value: value.kategorie_vozidla as string,
    count: Number(value.count)
  }));
}

export async function getStats_() {
  const [
    count,
    registrationCountsByYear,
    topBrands,
    topColors,
    topKinds,
    topCategories
  ] = await Promise.all([
    count_(),
    registrationsPerYear_(),
    topBrands_(),
    topColors_(),
    topKinds_(),
    topCategories_()
  ]);
  return {
    count,
    registrationCountsByYear,
    topBrands,
    topColors,
    topKinds,
    topCategories
  };
}

export async function searchBrands_(brand: string) {
  const result = await prisma.$queryRawTyped(queries.searchBrands(brand, 10));
  return result.map((value) => String(value.tovarni_znacka));
}

export async function searchModels_(brand: string, model: string) {
  const result = await prisma.$queryRawTyped(
    queries.searchTypesForBrand(brand, model, 10)
  );
  return result.map((value) => String(value.typ));
}
