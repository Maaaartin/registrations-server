import * as $runtime from "../runtime/library"

/**
 * @param limit
 */
export const topCountriesImports: (limit: number) => $runtime.TypedSql<topCountriesImports.Parameters, topCountriesImports.Result>

export namespace topCountriesImports {
  export type Parameters = [limit: number]
  export type Result = {
    country: string | null
    count: bigint | null
  }
}
