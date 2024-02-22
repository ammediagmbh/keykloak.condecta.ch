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
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceImportsInJsCode_vite = void 0;
var constants_1 = require("../../../constants");
var assert_1 = require("tsafe/assert");
var nodePath = __importStar(require("path"));
var String_prototype_replaceAll_1 = require("../../../tools/String.prototype.replaceAll");
(0, assert_1.assert)();
function replaceImportsInJsCode_vite(params) {
    var jsCode = params.jsCode, buildOptions = params.buildOptions, basenameOfAssetsFiles = params.basenameOfAssetsFiles, _a = params.systemType, systemType = _a === void 0 ? nodePath.sep === "/" ? "posix" : "win32" : _a;
    var _b = nodePath[systemType], pathRelative = _b.relative, pathSep = _b.sep;
    var fixedJsCode = jsCode;
    replace_base_javacript_import: {
        if (buildOptions.urlPathname === undefined) {
            break replace_base_javacript_import;
        }
        // Optimization
        if (!jsCode.includes(buildOptions.urlPathname)) {
            break replace_base_javacript_import;
        }
        // Replace `Hv=function(e){return"/abcde12345/"+e}` by `Hv=function(e){return"/"+e}`
        fixedJsCode = fixedJsCode.replace(new RegExp("([\\w\\$][\\w\\d\\$]*)=function\\(([\\w\\$][\\w\\d\\$]*)\\)\\{return\"".concat((0, String_prototype_replaceAll_1.replaceAll)(buildOptions.urlPathname, "/", "\\/"), "\"\\+\\2\\}"), "g"), function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var _b = __read(_a, 3), funcName = _b[1], paramName = _b[2];
            return "".concat(funcName, "=function(").concat(paramName, "){return\"/\"+").concat(paramName, "}");
        });
    }
    replace_javascript_relatives_import_paths: {
        // Example: "assets/ or "foo/bar/"
        var staticDir_1 = (function () {
            var out = pathRelative(buildOptions.reactAppBuildDirPath, buildOptions.assetsDirPath);
            out = (0, String_prototype_replaceAll_1.replaceAll)(out, pathSep, "/") + "/";
            if (out === "/") {
                throw new Error("The assetsDirPath must be a subdirectory of reactAppBuildDirPath");
            }
            return out;
        })();
        // Optimization
        if (!jsCode.includes(staticDir_1)) {
            break replace_javascript_relatives_import_paths;
        }
        basenameOfAssetsFiles
            .map(function (basenameOfAssetsFile) { return "".concat(staticDir_1).concat(basenameOfAssetsFile); })
            .forEach(function (relativePathOfAssetFile) {
            var _a;
            fixedJsCode = (0, String_prototype_replaceAll_1.replaceAll)(fixedJsCode, "\"".concat(relativePathOfAssetFile, "\""), "(window.".concat(constants_1.nameOfTheGlobal, ".url.resourcesPath.substring(1) + \"/").concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/").concat(relativePathOfAssetFile, "\")"));
            fixedJsCode = (0, String_prototype_replaceAll_1.replaceAll)(fixedJsCode, "\"".concat((_a = buildOptions.urlPathname) !== null && _a !== void 0 ? _a : "/").concat(relativePathOfAssetFile, "\""), "(window.".concat(constants_1.nameOfTheGlobal, ".url.resourcesPath + \"/").concat(constants_1.basenameOfTheKeycloakifyResourcesDir, "/").concat(relativePathOfAssetFile, "\")"));
        });
    }
    return { fixedJsCode: fixedJsCode };
}
exports.replaceImportsInJsCode_vite = replaceImportsInJsCode_vite;
//# sourceMappingURL=vite.js.map