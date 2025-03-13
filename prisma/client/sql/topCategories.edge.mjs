import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const topCategories = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_categories\nLIMIT\n$1;")
