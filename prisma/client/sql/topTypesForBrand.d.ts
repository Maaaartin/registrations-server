import * as $runtime from "../runtime/library"

/**
 * @param text
 * @param int8
 */
export const topTypesForBrand: (text: string, int8: number | bigint) => $runtime.TypedSql<topTypesForBrand.Parameters, topTypesForBrand.Result>

export namespace topTypesForBrand {
  export type Parameters = [text: string, int8: number | bigint]
  export type Result = {
    typ: string | null
    count: bigint | null
  }
}
