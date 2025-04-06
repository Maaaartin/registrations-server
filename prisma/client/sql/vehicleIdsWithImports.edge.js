"use strict"
const { makeTypedQueryFactory: $mkFactory } = require("../runtime/edge.js")
exports.vehicleIdsWithImports = /*#__PURE__*/ $mkFactory("SELECT DISTINCT\nr.id,\nr.pcv\nFROM\nregistrations r\nJOIN imports i ON r.pcv = i.pcv\nWHERE\n(\nr.tovarni_znacka = $1\nOR $1 IS NULL\n)\nAND (\nr.typ = $2\nOR $2 IS NULL\n)\nAND (\nr.datum_1_registrace > $3\nOR $3 IS NULL\n)\nAND (\nr.datum_1_registrace < $4\nOR $4 IS NULL\n)\nAND (\nr.plne_elektricke_vozidlo = $5\nOR $5 IS NULL\n)\nAND (\nr.hybridni_vozidlo = $6\nOR $6 IS NULL\n)\nORDER BY\nr.id\nLIMIT\n$7\nOFFSET\n$8;")
