import * as $runtime from "../runtime/library"

/**
 * @param text
 * @param int8
 */
export const searchBrands: (text: string, int8: number | bigint) => $runtime.TypedSql<searchBrands.Parameters, searchBrands.Result>

export namespace searchBrands {
  export type Parameters = [text: string, int8: number | bigint]
  export type Result = {
    tovarni_znacka: string | null
    count: bigint | null
  }
}
