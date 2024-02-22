"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCaseToCamelCase = void 0;
var capitalize_1 = require("tsafe/capitalize");
function kebabCaseToCamelCase(kebabCaseString) {
    var _a = __read(kebabCaseString.split("-")), first = _a[0], rest = _a.slice(1);
    return __spreadArray([first], __read(rest.map(capitalize_1.capitalize)), false).join("");
}
exports.kebabCaseToCamelCase = kebabCaseToCamelCase;
//# sourceMappingURL=kebabCaseToSnakeCase.js.map