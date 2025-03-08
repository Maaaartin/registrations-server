"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_brands\nLIMIT\n10;")
