import * as $runtime from "../runtime/library"

/**
 * @param text
 * @param text
 * @param int8
 */
export const searchTypesForBrand: (text: string, text: string, int8: number | bigint) => $runtime.TypedSql<searchTypesForBrand.Parameters, searchTypesForBrand.Result>

export namespace searchTypesForBrand {
  export type Parameters = [text: string, text: string, int8: number | bigint]
  export type Result = {
    typ: string | null
    count: bigint | null
  }
}
