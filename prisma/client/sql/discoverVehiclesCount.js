"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/library")
exports.discoverVehiclesCount = /*#__PURE__*/ $mkFactory("SELECT\nCOUNT(id)\nFROM\ndiscover_registrations (\n$1::text,\n$2::text,\n$3::date,\n$4::date,\n$5::bigint,\n$6::bigint,\n$7::boolean,\n$8::boolean,\n$9::boolean,\n$10::boolean,\n$11::integer,\nnull\n);")
