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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessageProperties = void 0;
var crawl_1 = require("../../tools/crawl");
var path_1 = require("path");
var fs_1 = require("fs");
var symToStr_1 = require("tsafe/symToStr");
var removeDuplicates_1 = require("evt/tools/reducers/removeDuplicates");
var recast = __importStar(require("recast"));
var babelParser = __importStar(require("@babel/parser"));
var generator_1 = __importDefault(require("@babel/generator"));
var babelTypes = __importStar(require("@babel/types"));
function generateMessageProperties(params) {
    var _a, e_1, _b, e_2, _c, e_3, _d, e_4, _e;
    var themeSrcDirPath = params.themeSrcDirPath, themeType = params.themeType;
    var files = (0, crawl_1.crawl)({
        "dirPath": (0, path_1.join)(themeSrcDirPath, themeType),
        "returnedPathsType": "absolute"
    });
    files = files.filter(function (file) {
        var regex = /\.(js|ts|tsx)$/;
        return regex.test(file);
    });
    files = files.sort(function (a, b) {
        var regex = /\.i18n\.(ts|js|tsx)$/;
        var aIsI18nFile = regex.test(a);
        var bIsI18nFile = regex.test(b);
        return aIsI18nFile === bIsI18nFile ? 0 : aIsI18nFile ? -1 : 1;
    });
    files = files.sort(function (a, b) { return a.length - b.length; });
    files = files.filter(function (file) { return (0, fs_1.readFileSync)(file).toString("utf8").includes("createUseI18n"); });
    if (files.length === 0) {
        return [];
    }
    var extraMessages = files
        .map(function (file) {
        var root = recast.parse((0, fs_1.readFileSync)(file).toString("utf8"), {
            "parser": {
                "parse": function (code) { return babelParser.parse(code, { "sourceType": "module", "plugins": ["typescript"] }); },
                "generator": generator_1.default,
                "types": babelTypes
            }
        });
        var codes = [];
        recast.visit(root, {
            "visitCallExpression": function (path) {
                if (path.node.callee.type === "Identifier" && path.node.callee.name === "createUseI18n") {
                    codes.push((0, generator_1.default)(path.node.arguments[0]).code);
                }
                this.traverse(path);
            }
        });
        return codes;
    })
        .flat()
        .map(function (code) {
        var extraMessages = {};
        try {
            eval("".concat((0, symToStr_1.symToStr)({ extraMessages: extraMessages }), " = ").concat(code));
        }
        catch (_a) {
            console.warn([
                "WARNING: Make sure that the first argument of createUseI18n can be evaluated in a javascript",
                "runtime where only the node globals are available.",
                "This is important because we need to put your i18n messages in messages_*.properties files",
                "or they won't be available server side.",
                "\n",
                "The following code could not be evaluated:",
                "\n",
                code
            ].join(" "));
        }
        return extraMessages;
    });
    var languageTags = (_a = extraMessages
        .map(function (extraMessage) { return Object.keys(extraMessage); })
        .flat())
        .reduce.apply(_a, __spreadArray([], __read((0, removeDuplicates_1.removeDuplicates)()), false));
    var keyValueMapByLanguageTag = {};
    try {
        for (var languageTags_1 = __values(languageTags), languageTags_1_1 = languageTags_1.next(); !languageTags_1_1.done; languageTags_1_1 = languageTags_1.next()) {
            var languageTag = languageTags_1_1.value;
            var keyValueMap = {};
            try {
                for (var extraMessages_1 = (e_2 = void 0, __values(extraMessages)), extraMessages_1_1 = extraMessages_1.next(); !extraMessages_1_1.done; extraMessages_1_1 = extraMessages_1.next()) {
                    var extraMessage = extraMessages_1_1.value;
                    var keyValueMap_i = extraMessage[languageTag];
                    if (keyValueMap_i === undefined) {
                        continue;
                    }
                    try {
                        for (var _f = (e_3 = void 0, __values(Object.entries(keyValueMap_i))), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var _h = __read(_g.value, 2), key = _h[0], value = _h[1];
                            if (keyValueMap[key] !== undefined) {
                                console.warn([
                                    "WARNING: The following key is defined multiple times:",
                                    "\n",
                                    key,
                                    "\n",
                                    "The following value will be ignored:",
                                    "\n",
                                    value,
                                    "\n",
                                    "The following value was already defined:",
                                    "\n",
                                    keyValueMap[key]
                                ].join(" "));
                                continue;
                            }
                            keyValueMap[key] = value;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_d = _f.return)) _d.call(_f);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (extraMessages_1_1 && !extraMessages_1_1.done && (_c = extraMessages_1.return)) _c.call(extraMessages_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            keyValueMapByLanguageTag[languageTag] = keyValueMap;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (languageTags_1_1 && !languageTags_1_1.done && (_b = languageTags_1.return)) _b.call(languageTags_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var out = [];
    try {
        for (var _j = __values(Object.entries(keyValueMapByLanguageTag)), _k = _j.next(); !_k.done; _k = _j.next()) {
            var _l = __read(_k.value, 2), languageTag = _l[0], keyValueMap = _l[1];
            var propertiesFileSource = Object.entries(keyValueMap)
                .map(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                return "".concat(key, "=").concat(escapeString(value));
            })
                .join("\n");
            out.push({
                languageTag: languageTag,
                "propertiesFileSource": ["# This file was generated by keycloakify", "", "parent=base", "", propertiesFileSource, ""].join("\n")
            });
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_k && !_k.done && (_e = _j.return)) _e.call(_j);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return out;
}
exports.generateMessageProperties = generateMessageProperties;
// Convert a JavaScript string to UTF-16 encoding
function toUTF16(codePoint) {
    if (codePoint <= 0xffff) {
        // BMP character
        return "\\u" + codePoint.toString(16).padStart(4, "0");
    }
    else {
        // Non-BMP character
        codePoint -= 0x10000;
        var highSurrogate = (codePoint >> 10) + 0xd800;
        var lowSurrogate = (codePoint % 0x400) + 0xdc00;
        return "\\u" + highSurrogate.toString(16).padStart(4, "0") + "\\u" + lowSurrogate.toString(16).padStart(4, "0");
    }
}
// Escapes special characters and converts unicode to UTF-16 encoding
function escapeString(str) {
    var e_5, _a;
    var escapedStr = "";
    try {
        for (var _b = __values(__spreadArray([], __read(str), false)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var char = _c.value;
            var codePoint = char.codePointAt(0);
            if (!codePoint)
                continue;
            if (char === "'") {
                escapedStr += "''"; // double single quotes
            }
            else if (codePoint > 0x7f) {
                escapedStr += toUTF16(codePoint); // non-ascii characters
            }
            else {
                escapedStr += char;
            }
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return escapedStr;
}
//# sourceMappingURL=generateMessageProperties.js.map