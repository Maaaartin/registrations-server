import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const registrationCountsByYear = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ncounts_by_year\nWHERE\nyear > $1\nAND year < $2\nORDER BY\nyear;")
