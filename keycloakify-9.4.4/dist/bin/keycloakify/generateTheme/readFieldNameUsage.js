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
exports.readFieldNameUsage = void 0;
var crawl_1 = require("../../tools/crawl");
var removeDuplicates_1 = require("evt/tools/reducers/removeDuplicates");
var path_1 = require("path");
var fs = __importStar(require("fs"));
/** Assumes the theme type exists */
function readFieldNameUsage(params) {
    var e_1, _a, e_2, _b;
    var keycloakifySrcDirPath = params.keycloakifySrcDirPath, themeSrcDirPath = params.themeSrcDirPath, themeType = params.themeType;
    var fieldNames = [];
    try {
        for (var _c = __values([(0, path_1.join)(keycloakifySrcDirPath, themeType), (0, path_1.join)(themeSrcDirPath, themeType)]), _d = _c.next(); !_d.done; _d = _c.next()) {
            var srcDirPath = _d.value;
            var filePaths = (0, crawl_1.crawl)({ "dirPath": srcDirPath, "returnedPathsType": "absolute" }).filter(function (filePath) { return /\.(ts|tsx|js|jsx)$/.test(filePath); });
            try {
                for (var filePaths_1 = (e_2 = void 0, __values(filePaths)), filePaths_1_1 = filePaths_1.next(); !filePaths_1_1.done; filePaths_1_1 = filePaths_1.next()) {
                    var filePath = filePaths_1_1.value;
                    var rawSourceFile = fs.readFileSync(filePath).toString("utf8");
                    if (!rawSourceFile.includes("messagesPerField")) {
                        continue;
                    }
                    fieldNames.push.apply(fieldNames, __spreadArray([], __read(Array.from(rawSourceFile.matchAll(/(?:(?:printIfExists)|(?:existsError)|(?:get)|(?:exists))\(\s*["']([^"']+)["']/g), function (m) { return m[1]; })), false));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (filePaths_1_1 && !filePaths_1_1.done && (_b = filePaths_1.return)) _b.call(filePaths_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var out = fieldNames.reduce.apply(fieldNames, __spreadArray([], __read((0, removeDuplicates_1.removeDuplicates)()), false));
    return out;
}
exports.readFieldNameUsage = readFieldNameUsage;
//# sourceMappingURL=readFieldNameUsage.js.map