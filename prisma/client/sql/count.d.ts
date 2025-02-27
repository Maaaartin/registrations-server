import * as $runtime from "../runtime/library"

/**
 */
export const count: () => $runtime.TypedSql<count.Parameters, count.Result>

export namespace count {
  export type Parameters = []
  export type Result = {
    count: bigint | null
  }
}
