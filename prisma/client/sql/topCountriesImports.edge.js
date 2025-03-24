"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topCountriesImports = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_countries_imports;")
