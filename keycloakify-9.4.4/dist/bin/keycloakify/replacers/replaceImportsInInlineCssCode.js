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
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImportsInInlineCssCode = void 0;
var assert_1 = require("tsafe/assert");
var constants_1 = require("../../constants");
(0, assert_1.assert)();
function replaceImportsInInlineCssCode(params) {
    var cssCode = params.cssCode, buildOptions = params.buildOptions;
    var fixedCssCode = cssCode.replace(buildOptions.urlPathname === undefined
        ? /url\(["']?\/([^/][^)"']+)["']?\)/g
        : new RegExp("url\\([\"']?".concat(buildOptions.urlPathname, "([^)\"']+)[\"']?\\)"), "g"), function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var _b = __read(_a, 2), group = _b[1];
        return "url(${url.resourcesPath}/".concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/").concat(group, ")");
    });
    return { fixedCssCode: fixedCssCode };
}
exports.replaceImportsInInlineCssCode = replaceImportsInInlineCssCode;
//# sourceMappingURL=replaceImportsInInlineCssCode.js.map