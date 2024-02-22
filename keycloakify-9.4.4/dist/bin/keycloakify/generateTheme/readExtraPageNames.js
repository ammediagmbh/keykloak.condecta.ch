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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExtraPagesNames = void 0;
var crawl_1 = require("../../tools/crawl");
var generateFtl_1 = require("../generateFtl");
var id_1 = require("tsafe/id");
var removeDuplicates_1 = require("evt/tools/reducers/removeDuplicates");
var fs = __importStar(require("fs"));
var path_1 = require("path");
function readExtraPagesNames(params) {
    var e_1, _a;
    var themeSrcDirPath = params.themeSrcDirPath, themeType = params.themeType;
    var filePaths = (0, crawl_1.crawl)({
        "dirPath": (0, path_1.join)(themeSrcDirPath, themeType),
        "returnedPathsType": "absolute"
    }).filter(function (filePath) { return /\.(ts|tsx|js|jsx)$/.test(filePath); });
    var candidateFilePaths = filePaths.filter(function (filePath) { return /kcContext\.[^.]+$/.test(filePath); });
    if (candidateFilePaths.length === 0) {
        candidateFilePaths.push.apply(candidateFilePaths, __spreadArray([], __read(filePaths), false));
    }
    var extraPages = [];
    try {
        for (var candidateFilePaths_1 = __values(candidateFilePaths), candidateFilePaths_1_1 = candidateFilePaths_1.next(); !candidateFilePaths_1_1.done; candidateFilePaths_1_1 = candidateFilePaths_1.next()) {
            var candidateFilPath = candidateFilePaths_1_1.value;
            var rawSourceFile = fs.readFileSync(candidateFilPath).toString("utf8");
            extraPages.push.apply(extraPages, __spreadArray([], __read(Array.from(rawSourceFile.matchAll(/["']?pageId["']?\s*:\s*["']([^.]+.ftl)["']/g), function (m) { return m[1]; })), false));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (candidateFilePaths_1_1 && !candidateFilePaths_1_1.done && (_a = candidateFilePaths_1.return)) _a.call(candidateFilePaths_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return extraPages.reduce.apply(extraPages, __spreadArray([], __read((0, removeDuplicates_1.removeDuplicates)()), false)).filter(function (pageId) {
        switch (themeType) {
            case "account":
                return !(0, id_1.id)(generateFtl_1.accountThemePageIds).includes(pageId);
            case "login":
                return !(0, id_1.id)(generateFtl_1.loginThemePageIds).includes(pageId);
        }
    });
}
exports.readExtraPagesNames = readExtraPagesNames;
//# sourceMappingURL=readExtraPageNames.js.map