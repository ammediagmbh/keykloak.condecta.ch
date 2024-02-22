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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
exports.getThemeSrcDirPath = void 0;
var fs = __importStar(require("fs"));
var tsafe_1 = require("tsafe");
var crawl_1 = require("./tools/crawl");
var path_1 = require("path");
var constants_1 = require("./constants");
var themeSrcDirBasenames = ["keycloak-theme", "keycloak_theme"];
/** Can't catch error, if the directory isn't found, this function will just exit the process with an error message. */
function getThemeSrcDirPath(params) {
    var e_1, _a;
    var reactAppRootDirPath = params.reactAppRootDirPath;
    var srcDirPath = (0, path_1.join)(reactAppRootDirPath, "src");
    var themeSrcDirPath = (0, crawl_1.crawl)({ "dirPath": srcDirPath, "returnedPathsType": "relative to dirPath" })
        .map(function (fileRelativePath) {
        var e_2, _a;
        try {
            for (var themeSrcDirBasenames_1 = __values(themeSrcDirBasenames), themeSrcDirBasenames_1_1 = themeSrcDirBasenames_1.next(); !themeSrcDirBasenames_1_1.done; themeSrcDirBasenames_1_1 = themeSrcDirBasenames_1.next()) {
                var themeSrcDirBasename = themeSrcDirBasenames_1_1.value;
                var split = fileRelativePath.split(themeSrcDirBasename);
                if (split.length === 2) {
                    return (0, path_1.join)(srcDirPath, split[0] + themeSrcDirBasename);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (themeSrcDirBasenames_1_1 && !themeSrcDirBasenames_1_1.done && (_a = themeSrcDirBasenames_1.return)) _a.call(themeSrcDirBasenames_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return undefined;
    })
        .filter((0, tsafe_1.exclude)(undefined))[0];
    if (themeSrcDirPath !== undefined) {
        return { themeSrcDirPath: themeSrcDirPath };
    }
    try {
        for (var _b = __values(__spreadArray(__spreadArray([], __read(constants_1.themeTypes), false), ["email"], false)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var themeType = _c.value;
            if (!fs.existsSync((0, path_1.join)(srcDirPath, themeType))) {
                continue;
            }
            return { "themeSrcDirPath": srcDirPath };
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.error([
        "Can't locate your theme source directory. It should be either: ",
        "src/ or src/keycloak-theme or src/keycloak_theme.",
        "Example in the starter: https://github.com/keycloakify/keycloakify-starter/tree/main/src/keycloak-theme"
    ].join("\n"));
    process.exit(-1);
}
exports.getThemeSrcDirPath = getThemeSrcDirPath;
//# sourceMappingURL=getThemeSrcDirPath.js.map