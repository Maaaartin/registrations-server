import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const topCategories = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_categories\nLIMIT\n$1;")
