import prisma from '.';
import queries from './client/sql';

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
