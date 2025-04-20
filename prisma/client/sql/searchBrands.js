"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.searchBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_brands\nWHERE\n$1::TEXT IS NULL\nOR tovarni_znacka ILIKE $1 || '%'\nLIMIT\n$2;")
