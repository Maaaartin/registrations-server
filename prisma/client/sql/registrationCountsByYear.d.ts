import * as $runtime from "../runtime/library"

/**
 */
export const registrationCountsByYear: () => $runtime.TypedSql<registrationCountsByYear.Parameters, registrationCountsByYear.Result>

export namespace registrationCountsByYear {
  export type Parameters = []
  export type Result = {
    year: $runtime.Decimal | null
    count: bigint | null
  }
}
