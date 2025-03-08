"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.count = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nid_count;")
