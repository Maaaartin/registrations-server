import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param model
 * @param limit
 */
export const searchTypesForBrand: (brand: string, model: string, limit: number) => $runtime.TypedSql<searchTypesForBrand.Parameters, searchTypesForBrand.Result>

export namespace searchTypesForBrand {
  export type Parameters = [brand: string, model: string, limit: number]
  export type Result = {
    typ: string | null
    count: bigint | null
  }
}
