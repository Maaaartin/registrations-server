import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const searchBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_brands\nWHERE\ntovarni_znacka ILIKE $1 || '%'\nLIMIT\n$2;")
