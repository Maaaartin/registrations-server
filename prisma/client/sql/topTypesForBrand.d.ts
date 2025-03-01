import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param limit
 */
export const topTypesForBrand: (brand: string, limit: number) => $runtime.TypedSql<topTypesForBrand.Parameters, topTypesForBrand.Result>

export namespace topTypesForBrand {
  export type Parameters = [brand: string, limit: number]
  export type Result = {
    typ: string | null
    count: bigint | null
  }
}
