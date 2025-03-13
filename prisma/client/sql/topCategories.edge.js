"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topCategories = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_categories\nLIMIT\n$1;")
