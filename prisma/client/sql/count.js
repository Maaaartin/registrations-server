"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.count = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nid_count;")
