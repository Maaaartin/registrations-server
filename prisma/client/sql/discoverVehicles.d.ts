import * as $runtime from "../runtime/library"

/**
 * @param brand
 * @param model
 * @param datum_od
 * @param datum_do
 * @param electric
 * @param hybrid
 * @param require_imports
 * @param require_owners
 * @param require_removed
 * @param require_inspections
 * @param require_equipment
 * @param limit
 * @param offset
 */
export const discoverVehicles: (brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_owners: boolean | null, require_removed: boolean | null, require_inspections: boolean | null, require_equipment: boolean | null, limit: number, offset: number) => $runtime.TypedSql<discoverVehicles.Parameters, discoverVehicles.Result>

export namespace discoverVehicles {
  export type Parameters = [brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_owners: boolean | null, require_removed: boolean | null, require_inspections: boolean | null, require_equipment: boolean | null, limit: number, offset: number]
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
