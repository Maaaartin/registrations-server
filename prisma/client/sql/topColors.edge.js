"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.topColors = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_colors\nLIMIT\n10;")
