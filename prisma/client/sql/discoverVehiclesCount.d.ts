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
 */
export const discoverVehiclesCount: (brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_owners: boolean | null, require_removed: boolean | null, require_inspections: boolean | null, require_equipment: boolean | null) => $runtime.TypedSql<discoverVehiclesCount.Parameters, discoverVehiclesCount.Result>

export namespace discoverVehiclesCount {
  export type Parameters = [brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_owners: boolean | null, require_removed: boolean | null, require_inspections: boolean | null, require_equipment: boolean | null]
  export type Result = {
    count: bigint | null
  }
}
