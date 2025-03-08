import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const registrationCountsByYear = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ncounts_by_year\nORDER BY\nyear;")
