"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.topFuels = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_fuels\nLIMIT\n$1;")
