import * as $runtime from "../runtime/library"

/**
 */
export const topBrands: () => $runtime.TypedSql<topBrands.Parameters, topBrands.Result>

export namespace topBrands {
  export type Parameters = []
  export type Result = {
    tovarni_znacka: string | null
    count: bigint | null
  }
}
