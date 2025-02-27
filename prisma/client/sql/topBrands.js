"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.topBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_top_brands\nLIMIT\n10;")
