import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const searchTypesForBrand = /*#__PURE__*/ $mkFactory("SELECT\ntyp,\ncount\nFROM\ntop_types_per_brand\nWHERE\ntovarni_znacka = $1\nAND typ ILIKE $2 || '%'\nORDER BY\ncount DESC\nLIMIT\n$3;")
