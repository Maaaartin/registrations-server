"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topTypesForBrand = /*#__PURE__*/ $mkFactory("SELECT\ntyp,\ncount\nFROM\nregistration_top_types\nWHERE\ntovarni_znacka = $1\nORDER BY\ncount DESC\nLIMIT\n$2;")
