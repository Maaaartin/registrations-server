import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const registrationCountsByYear = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ncounts_by_year\nORDER BY\nyear;")
