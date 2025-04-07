import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param model
 * @param datum_1_registrace_od
 * @param datum_1_registrace_do
 * @param plne_elektricke_vozidlo
 * @param hybridni_vozidlo
 * @param limit
 * @param offset
 * @param only_count
 */
export const vehicleIdsWithImports: (brand: string | null, model: string | null, datum_1_registrace_od: Date | null, datum_1_registrace_do: Date | null, plne_elektricke_vozidlo: boolean | null, hybridni_vozidlo: boolean | null, limit: number | null, offset: number | null, only_count: boolean | null) => $runtime.TypedSql<vehicleIdsWithImports.Parameters, vehicleIdsWithImports.Result>

export namespace vehicleIdsWithImports {
  export type Parameters = [brand: string | null, model: string | null, datum_1_registrace_od: Date | null, datum_1_registrace_do: Date | null, plne_elektricke_vozidlo: boolean | null, hybridni_vozidlo: boolean | null, limit: number | null, offset: number | null, only_count: boolean | null]
  export type Result = {
    id: number | null
    total_count: bigint | null
  }
}
