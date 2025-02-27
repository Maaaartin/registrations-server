"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_top_brands\nLIMIT\n10;")
