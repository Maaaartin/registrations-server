"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.registrationCountsByYear = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ncounts_by_year\nWHERE\nyear > $1\nAND year < $2\nORDER BY\nyear;")
