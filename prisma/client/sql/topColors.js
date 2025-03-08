"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.topColors = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_colors\nLIMIT\n10;")
