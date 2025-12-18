import * as $runtime from "../runtime/client"

/**
 * @param brand
 * @param limit
 */
export const searchBrands: (brand: string | null, limit: number) => $runtime.TypedSql<searchBrands.Parameters, searchBrands.Result>

export namespace searchBrands {
  export type Parameters = [brand: string | null, limit: number]
  export type Result = {
    tovarni_znacka: string | null
    count: bigint | null
  }
}
