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
 */
export const discoverVehiclesCount: (brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, production_year_from: number | bigint | null, production_year_to: number | bigint | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_removed: boolean | null, limit: number) => $runtime.TypedSql<discoverVehiclesCount.Parameters, discoverVehiclesCount.Result>

export namespace discoverVehiclesCount {
  export type Parameters = [brand: string | null, model: string | null, datum_od: Date | null, datum_do: Date | null, production_year_from: number | bigint | null, production_year_to: number | bigint | null, electric: boolean | null, hybrid: boolean | null, require_imports: boolean | null, require_removed: boolean | null, limit: number]
  export type Result = {
    count: bigint | null
  }
}
