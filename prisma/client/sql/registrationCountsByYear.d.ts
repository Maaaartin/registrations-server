import * as $runtime from "../runtime/library"

/**
 * @param minYear
 * @param maxYear
 */
export const registrationCountsByYear: (minYear: number, maxYear: number) => $runtime.TypedSql<registrationCountsByYear.Parameters, registrationCountsByYear.Result>

export namespace registrationCountsByYear {
  export type Parameters = [minYear: number, maxYear: number]
  export type Result = {
    year: $runtime.Decimal | null
    count: bigint | null
  }
}
