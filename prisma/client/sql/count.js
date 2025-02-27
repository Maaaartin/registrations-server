"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.count = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\nregistration_ids;")
