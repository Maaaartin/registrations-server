import * as $runtime from "../runtime/client"

/**
 * @param limit
 * @param palivo
 */
export const topFuels: (limit: number, palivo: string | null) => $runtime.TypedSql<topFuels.Parameters, topFuels.Result>

export namespace topFuels {
  export type Parameters = [limit: number, palivo: string | null]
  export type Result = {
    palivo: string | null
    count: bigint | null
  }
}
