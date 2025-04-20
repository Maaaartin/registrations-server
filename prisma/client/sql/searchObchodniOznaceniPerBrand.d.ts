import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param obchodni_oznaceni
 * @param limit
 */
export const searchObchodniOznaceniPerBrand: (brand: string, obchodni_oznaceni: string | null, limit: number) => $runtime.TypedSql<searchObchodniOznaceniPerBrand.Parameters, searchObchodniOznaceniPerBrand.Result>

export namespace searchObchodniOznaceniPerBrand {
  export type Parameters = [brand: string, obchodni_oznaceni: string | null, limit: number]
  export type Result = {
    obchodni_oznaceni: string | null
    count: bigint | null
  }
}
