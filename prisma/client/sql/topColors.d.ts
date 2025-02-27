import * as $runtime from "../runtime/library"

/**
 */
export const topColors: () => $runtime.TypedSql<topColors.Parameters, topColors.Result>

export namespace topColors {
  export type Parameters = []
  export type Result = {
    barva: string | null
    count: bigint | null
  }
}
