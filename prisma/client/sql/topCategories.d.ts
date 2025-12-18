import * as $runtime from "../runtime/client"

/**
 * @param limit
 */
export const topCategories: (limit: number) => $runtime.TypedSql<topCategories.Parameters, topCategories.Result>

export namespace topCategories {
  export type Parameters = [limit: number]
  export type Result = {
    kategorie_vozidla: string | null
    count: bigint | null
  }
}
