import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param limit
 */
export const searchBrands: (brand: string, limit: number) => $runtime.TypedSql<searchBrands.Parameters, searchBrands.Result>

export namespace searchBrands {
  export type Parameters = [brand: string, limit: number]
  export type Result = {
    tovarni_znacka: string | null
    count: bigint | null
  }
}
