import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const topBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_top_brands\nLIMIT\n10;")
