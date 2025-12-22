import * as $runtime from "../runtime/client"

/**
 * @param tovarni_znacka
 * @param typ
 * @param datum_prvni_registrace_od
 * @param datum_prvni_registrace_do
 * @param rok_vyroby_od
 * @param rok_vyroby_do
 * @param only_electric
 * @param only_hybrid
 * @param only_imported
 * @param only_removed
 * @param limit
 */
export const discoverMvCount: (tovarni_znacka: string | null, typ: string | null, datum_prvni_registrace_od: Date | null, datum_prvni_registrace_do: Date | null, rok_vyroby_od: number | null, rok_vyroby_do: number | null, only_electric: boolean | null, only_hybrid: boolean | null, only_imported: boolean | null, only_removed: boolean | null, limit: number | null) => $runtime.TypedSql<discoverMvCount.Parameters, discoverMvCount.Result>

export namespace discoverMvCount {
  export type Parameters = [tovarni_znacka: string | null, typ: string | null, datum_prvni_registrace_od: Date | null, datum_prvni_registrace_do: Date | null, rok_vyroby_od: number | null, rok_vyroby_do: number | null, only_electric: boolean | null, only_hybrid: boolean | null, only_imported: boolean | null, only_removed: boolean | null, limit: number | null]
  export type Result = {
    count: bigint | null
  }
}
