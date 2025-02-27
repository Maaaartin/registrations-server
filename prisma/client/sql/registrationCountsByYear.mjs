import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const registrationCountsByYear = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_counts_by_year\nORDER BY\nyear;")
