"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.topCountriesImports = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_countries_imports\nLIMIT\n$1;")
