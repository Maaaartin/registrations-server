import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const discoverVehicles = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ndiscover_registrations (\n$1::text,\n$2::text,\n$3::date,\n$4::date,\n$5::boolean,\n$6::boolean,\n$7::boolean,\n$8::boolean,\n$9::boolean,\n$10::boolean,\n$11::boolean,\n$12::integer,\n$13::integer\n);")
