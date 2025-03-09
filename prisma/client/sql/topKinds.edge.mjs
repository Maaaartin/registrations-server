import { makeTypedQueryFactory as $mkFactory } from "../runtime/edge.js"
export const topKinds = /*#__PURE__*/ $mkFactory("SELECT\n*\nFROM\ntop_kinds\nLIMIT\n$1;")
