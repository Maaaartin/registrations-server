"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.topBrands = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_brands\nLIMIT\n10;")
