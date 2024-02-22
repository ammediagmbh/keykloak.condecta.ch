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
exports.generateCssCodeToDefineGlobals = exports.replaceImportsInCssCode = void 0;
var crypto = __importStar(require("crypto"));
var assert_1 = require("tsafe/assert");
var constants_1 = require("../../constants");
(0, assert_1.assert)();
function replaceImportsInCssCode(params) {
    var _a;
    var cssCode = params.cssCode;
    var cssGlobalsToDefine = {};
    new Set((_a = cssCode.match(/url\(["']?\/[^/][^)"']+["']?\)[^;}]*?/g)) !== null && _a !== void 0 ? _a : []).forEach(function (match) { return (cssGlobalsToDefine["url" + crypto.createHash("sha256").update(match).digest("hex").substring(0, 15)] = match); });
    var fixedCssCode = cssCode;
    Object.keys(cssGlobalsToDefine).forEach(function (cssVariableName) {
        //NOTE: split/join pattern ~ replace all
        return (fixedCssCode = fixedCssCode.split(cssGlobalsToDefine[cssVariableName]).join("var(--".concat(cssVariableName, ")")));
    });
    return { fixedCssCode: fixedCssCode, cssGlobalsToDefine: cssGlobalsToDefine };
}
exports.replaceImportsInCssCode = replaceImportsInCssCode;
function generateCssCodeToDefineGlobals(params) {
    var cssGlobalsToDefine = params.cssGlobalsToDefine, buildOptions = params.buildOptions;
    return {
        "cssCodeToPrependInHead": __spreadArray(__spreadArray([
            ":root {"
        ], __read(Object.keys(cssGlobalsToDefine)
            .map(function (cssVariableName) {
            var _a;
            return [
                "--".concat(cssVariableName, ":"),
                cssGlobalsToDefine[cssVariableName].replace(new RegExp("url\\(".concat(((_a = buildOptions.urlPathname) !== null && _a !== void 0 ? _a : "/").replace(/\//g, "\\/")), "g"), "url(${url.resourcesPath}/".concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/"))
            ].join(" ");
        })
            .map(function (line) { return "    ".concat(line, ";"); })), false), [
            "}"
        ], false).join("\n")
    };
}
exports.generateCssCodeToDefineGlobals = generateCssCodeToDefineGlobals;
//# sourceMappingURL=replaceImportsInCssCode.js.map