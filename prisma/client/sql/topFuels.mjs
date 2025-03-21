import { makeTypedQueryFactory as $mkFactory } from "../runtime/library"
export const topFuels = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_fuels\nLIMIT\n$1;")
