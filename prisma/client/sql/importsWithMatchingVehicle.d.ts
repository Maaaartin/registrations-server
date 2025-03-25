import * as $runtime from "../runtime/library"

/**
 * @param limit
 * @param offset
 * @param country
 */
export const importsWithMatchingVehicle: (limit: number, offset: number, country: string | null) => $runtime.TypedSql<importsWithMatchingVehicle.Parameters, importsWithMatchingVehicle.Result>

export namespace importsWithMatchingVehicle {
  export type Parameters = [limit: number, offset: number, country: string | null]
  export type Result = {
    id: number
    pcv: bigint | null
    country: string | null
    import_date: Date | null
  }
}
