import * as $runtime from "../runtime/library"

/**
 * @param limit
 */
export const topKinds: (limit: number) => $runtime.TypedSql<topKinds.Parameters, topKinds.Result>

export namespace topKinds {
  export type Parameters = [limit: number]
  export type Result = {
    druh_vozidla: string | null
    count: bigint | null
  }
}
