"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.registrationCountsByYear = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_counts_by_year\nORDER BY\nyear;")
