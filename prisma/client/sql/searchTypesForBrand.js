"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.searchTypesForBrand = /*#__PURE__*/ $mkFactory("SELECT\ntyp,\ncount\nFROM\nregistration_top_types\nWHERE\ntovarni_znacka = $1\nAND typ ILIKE $2 || '%'\nORDER BY\ncount DESC\nLIMIT\n$3;")
