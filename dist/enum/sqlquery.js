"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlquery = void 0;
var sqlquery;
(function (sqlquery) {
    sqlquery[sqlquery["SELECT"] = 0] = "SELECT";
    sqlquery[sqlquery["SELECT_WITH_WHERE"] = 1] = "SELECT_WITH_WHERE";
    sqlquery[sqlquery["SELECT_WHERE_ORDER"] = 2] = "SELECT_WHERE_ORDER";
    sqlquery[sqlquery["SELECT_WHERE_ORDER_GROUPBY"] = 3] = "SELECT_WHERE_ORDER_GROUPBY";
})(sqlquery || (exports.sqlquery = sqlquery = {}));
