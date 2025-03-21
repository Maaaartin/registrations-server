import * as $runtime from "../runtime/library"

/**
 * @param limit
 */
export const topFuels: (limit: number) => $runtime.TypedSql<topFuels.Parameters, topFuels.Result>

export namespace topFuels {
  export type Parameters = [limit: number]
  export type Result = {
    palivo: string | null
    count: bigint | null
  }
}
