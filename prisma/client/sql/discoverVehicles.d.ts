import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param model
 * @param datum_od
 * @param datum_do
 * @param production_year_from
 * @param production_year_to
 * @param electric
 * @param hybrid
 * @param require_imports
 * @param require_removed
 * @param limit
 * @param offset
 */
export const discoverVehicles: (brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, production_year_from: number | bigint | null, production_year_to: number | bigint | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_removed: boolean | null, limit: number, offset: number) => $runtime.TypedSql<discoverVehicles.Parameters, discoverVehicles.Result>

export namespace discoverVehicles {
  export type Parameters = [brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, production_year_from: number | bigint | null, production_year_to: number | bigint | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_removed: boolean | null, limit: number, offset: number]
  export type Result = {
    id: number | null
    tovarni_znacka: string | null
    typ: string | null
    datum_1_registrace: Date | null
    pcv: bigint | null
    cislo_orv: string | null
    cislo_tp: string | null
    vin: string | null
  }
}
