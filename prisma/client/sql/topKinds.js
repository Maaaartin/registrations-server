"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.topKinds = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_kinds\nLIMIT\n$1;")
