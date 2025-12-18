import * as $runtime from "../runtime/client"

/**
 */
export const topCountriesImports: () => $runtime.TypedSql<topCountriesImports.Parameters, topCountriesImports.Result>

export namespace topCountriesImports {
  export type Parameters = []
  export type Result = {
    country: string | null
    count: bigint | null
  }
}
