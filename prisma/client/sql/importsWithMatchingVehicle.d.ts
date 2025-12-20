import * as $runtime from "../runtime/client"

/**
 * @param limit
 * @param offset
 * @param country
 * @param tovarni_znacka
 * @param typ
 */
export const importsWithMatchingVehicle: (limit: number, offset: number, country: string | null, tovarni_znacka: string | null, typ: string | null) => $runtime.TypedSql<importsWithMatchingVehicle.Parameters, importsWithMatchingVehicle.Result>

export namespace importsWithMatchingVehicle {
  export type Parameters = [limit: number, offset: number, country: string | null, tovarni_znacka: string | null, typ: string | null]
  export type Result = {
    source: string | null
    pcv: bigint | null
    id: number | null
  }
}
