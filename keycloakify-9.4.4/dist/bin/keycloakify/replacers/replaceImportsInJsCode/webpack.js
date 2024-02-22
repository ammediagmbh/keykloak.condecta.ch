"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.replaceImportsInJsCode_webpack = void 0;
var constants_1 = require("../../../constants");
var assert_1 = require("tsafe/assert");
var nodePath = __importStar(require("path"));
var String_prototype_replaceAll_1 = require("../../../tools/String.prototype.replaceAll");
(0, assert_1.assert)();
function replaceImportsInJsCode_webpack(params) {
    var _a;
    var jsCode = params.jsCode, buildOptions = params.buildOptions, _b = params.systemType, systemType = _b === void 0 ? nodePath.sep === "/" ? "posix" : "win32" : _b;
    var _c = nodePath[systemType], pathRelative = _c.relative, pathSep = _c.sep;
    var fixedJsCode = jsCode;
    if (buildOptions.urlPathname !== undefined) {
        // "__esModule",{value:!0})},n.p="/foo-bar/",function(){if("undefined"  -> ... n.p="/" ...
        fixedJsCode = fixedJsCode.replace(new RegExp(",([a-zA-Z]\\.[a-zA-Z])=\"".concat((0, String_prototype_replaceAll_1.replaceAll)(buildOptions.urlPathname, "/", "\\/"), "\","), "g"), function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 2), assignTo = _b[1];
            return ",".concat(assignTo, "=\"/\",");
        });
    }
    // Example: "static/ or "foo/bar/"
    var staticDir = (function () {
        var out = pathRelative(buildOptions.reactAppBuildDirPath, buildOptions.assetsDirPath);
        out = (0, String_prototype_replaceAll_1.replaceAll)(out, pathSep, "/") + "/";
        if (out === "/") {
            throw new Error("The assetsDirPath must be a subdirectory of reactAppBuildDirPath");
        }
        return out;
    })();
    var getReplaceArgs = function (language) { return [
        new RegExp("([a-zA-Z_]+)\\.([a-zA-Z]+)=(function\\(([a-z]+)\\){return|([a-z]+)=>)\"".concat(staticDir.replace(/\//g, "\\/")).concat(language, "\\/\""), "g"),
        function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 5), n = _b[1], u = _b[2], matchedFunction = _b[3], eForFunction = _b[4];
            var isArrowFunction = matchedFunction.includes("=>");
            var e = isArrowFunction ? matchedFunction.replace("=>", "").trim() : eForFunction;
            return "\n            ".concat(n, "[(function(){\n                var pd = Object.getOwnPropertyDescriptor(").concat(n, ", \"p\");\n                if( pd === undefined || pd.configurable ){\n                    Object.defineProperty(").concat(n, ", \"p\", {\n                        get: function() { return window.").concat(constants_1.nameOfTheGlobal, ".url.resourcesPath; },\n                        set: function() {}\n                    });\n                }\n                return \"").concat(u, "\";\n            })()] = ").concat(isArrowFunction ? "".concat(e, " =>") : "function(".concat(e, ") { return "), " \"/").concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/").concat(staticDir).concat(language, "/\"")
                .replace(/\s+/g, " ")
                .trim();
        }
    ]; };
    fixedJsCode = (_a = fixedJsCode
        .replace.apply(fixedJsCode, __spreadArray([], __read(getReplaceArgs("js")), false)))
        .replace.apply(_a, __spreadArray([], __read(getReplaceArgs("css")), false)).replace(new RegExp("[a-zA-Z]+\\.[a-zA-Z]+\\+\"".concat(staticDir.replace(/\//g, "\\/")), "g"), "window.".concat(constants_1.nameOfTheGlobal, ".url.resourcesPath + \"/").concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/").concat(staticDir));
    return { fixedJsCode: fixedJsCode };
}
exports.replaceImportsInJsCode_webpack = replaceImportsInJsCode_webpack;
//# sourceMappingURL=webpack.js.map