"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.searchBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_top_brands\nWHERE\ntovarni_znacka ILIKE $1 || '%'\nLIMIT\n$2;")
