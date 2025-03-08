import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const topBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_brands\nLIMIT\n10;")
