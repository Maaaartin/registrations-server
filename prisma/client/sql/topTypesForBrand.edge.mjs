import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const topTypesForBrand = /*#__PURE__*/ $mkFactory("SELECT\ntyp,\ncount\nFROM\ntop_types_per_brand\nWHERE\ntovarni_znacka = $1\nORDER BY\ncount DESC\nLIMIT\n$2;")
