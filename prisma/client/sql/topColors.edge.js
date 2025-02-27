"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topColors = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_top_colors\nLIMIT\n10;")
