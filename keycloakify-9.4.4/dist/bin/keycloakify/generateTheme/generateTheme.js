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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.generateTheme = void 0;
var transformCodebase_1 = require("../../tools/transformCodebase");
var fs = __importStar(require("fs"));
var path_1 = require("path");
var replaceImportsInJsCode_1 = require("../replacers/replaceImportsInJsCode");
var replaceImportsInCssCode_1 = require("../replacers/replaceImportsInCssCode");
var generateFtl_1 = require("../generateFtl");
var constants_1 = require("../../constants");
var isInside_1 = require("../../tools/isInside");
var assert_1 = require("tsafe/assert");
var downloadKeycloakStaticResources_1 = require("./downloadKeycloakStaticResources");
var readFieldNameUsage_1 = require("./readFieldNameUsage");
var readExtraPageNames_1 = require("./readExtraPageNames");
var generateMessageProperties_1 = require("./generateMessageProperties");
var bringInAccountV1_1 = require("./bringInAccountV1");
var fs_rmSync_1 = require("../../tools/fs.rmSync");
(0, assert_1.assert)();
function generateTheme(params) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var themeName, themeSrcDirPath, keycloakifySrcDirPath, buildOptions, keycloakifyVersion, getThemeTypeDirPath, cssGlobalsToDefine, implementedThemeTypes, _loop_1, _b, _c, themeType, e_1_1, emailThemeSrcDirPath, parsedKeycloakThemeJson, keycloakThemeJsonFilePath;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    themeName = params.themeName, themeSrcDirPath = params.themeSrcDirPath, keycloakifySrcDirPath = params.keycloakifySrcDirPath, buildOptions = params.buildOptions, keycloakifyVersion = params.keycloakifyVersion;
                    getThemeTypeDirPath = function (params) {
                        var themeType = params.themeType, _a = params.isRetrocompat, isRetrocompat = _a === void 0 ? false : _a;
                        return (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "src", "main", "resources", "theme", "".concat(themeName).concat(isRetrocompat ? constants_1.retrocompatPostfix : ""), themeType);
                    };
                    cssGlobalsToDefine = {};
                    implementedThemeTypes = {
                        "login": false,
                        "account": false,
                        "email": false
                    };
                    _loop_1 = function (themeType) {
                        var themeTypeDirPath, destDirPath, generateFtlFilesCode;
                        return __generator(this, function (_g) {
                            switch (_g.label) {
                                case 0:
                                    if (!fs.existsSync((0, path_1.join)(themeSrcDirPath, themeType))) {
                                        return [2 /*return*/, "continue"];
                                    }
                                    implementedThemeTypes[themeType] = true;
                                    themeTypeDirPath = getThemeTypeDirPath({ themeType: themeType });
                                    apply_replacers_and_move_to_theme_resources: {
                                        destDirPath = (0, path_1.join)(themeTypeDirPath, "resources", constants_1.basenameOfTheKeycloakifyResourcesDir);
                                        // NOTE: Prevent accumulation of files in the assets dir, as names are hashed they pile up.
                                        (0, fs_rmSync_1.rmSync)(destDirPath, { "recursive": true, "force": true });
                                        if (themeType === "account" && implementedThemeTypes.login) {
                                            // NOTE: We prevend doing it twice, it has been done for the login theme.
                                            (0, transformCodebase_1.transformCodebase)({
                                                "srcDirPath": (0, path_1.join)(getThemeTypeDirPath({
                                                    "themeType": "login"
                                                }), "resources", constants_1.basenameOfTheKeycloakifyResourcesDir),
                                                destDirPath: destDirPath
                                            });
                                            break apply_replacers_and_move_to_theme_resources;
                                        }
                                        (0, transformCodebase_1.transformCodebase)({
                                            "srcDirPath": buildOptions.reactAppBuildDirPath,
                                            destDirPath: destDirPath,
                                            "transformSourceCode": function (_a) {
                                                var filePath = _a.filePath, sourceCode = _a.sourceCode;
                                                //NOTE: Prevent cycles, excludes the folder we generated for debug in public/
                                                // This should not happen if users follow the new instruction setup but we keep it for retrocompatibility.
                                                if ((0, isInside_1.isInside)({
                                                    "dirPath": (0, path_1.join)(buildOptions.reactAppBuildDirPath, constants_1.keycloak_resources),
                                                    filePath: filePath
                                                })) {
                                                    return undefined;
                                                }
                                                if (/\.css?$/i.test(filePath)) {
                                                    var _b = (0, replaceImportsInCssCode_1.replaceImportsInCssCode)({
                                                        "cssCode": sourceCode.toString("utf8")
                                                    }), cssGlobalsToDefineForThisFile = _b.cssGlobalsToDefine, fixedCssCode = _b.fixedCssCode;
                                                    Object.entries(cssGlobalsToDefineForThisFile).forEach(function (_a) {
                                                        var _b = __read(_a, 2), key = _b[0], value = _b[1];
                                                        cssGlobalsToDefine[key] = value;
                                                    });
                                                    return { "modifiedSourceCode": Buffer.from(fixedCssCode, "utf8") };
                                                }
                                                if (/\.js?$/i.test(filePath)) {
                                                    var fixedJsCode = (0, replaceImportsInJsCode_1.replaceImportsInJsCode)({
                                                        "jsCode": sourceCode.toString("utf8"),
                                                        buildOptions: buildOptions
                                                    }).fixedJsCode;
                                                    return { "modifiedSourceCode": Buffer.from(fixedJsCode, "utf8") };
                                                }
                                                return { "modifiedSourceCode": sourceCode };
                                            }
                                        });
                                    }
                                    generateFtlFilesCode = (0, generateFtl_1.generateFtlFilesCodeFactory)({
                                        themeName: themeName,
                                        "indexHtmlCode": fs.readFileSync((0, path_1.join)(buildOptions.reactAppBuildDirPath, "index.html")).toString("utf8"),
                                        cssGlobalsToDefine: cssGlobalsToDefine,
                                        buildOptions: buildOptions,
                                        keycloakifyVersion: keycloakifyVersion,
                                        themeType: themeType,
                                        "fieldNames": (0, readFieldNameUsage_1.readFieldNameUsage)({
                                            keycloakifySrcDirPath: keycloakifySrcDirPath,
                                            themeSrcDirPath: themeSrcDirPath,
                                            themeType: themeType
                                        })
                                    }).generateFtlFilesCode;
                                    __spreadArray(__spreadArray([], __read((function () {
                                        switch (themeType) {
                                            case "login":
                                                return generateFtl_1.loginThemePageIds;
                                            case "account":
                                                return generateFtl_1.accountThemePageIds;
                                        }
                                    })()), false), __read((0, readExtraPageNames_1.readExtraPagesNames)({
                                        themeType: themeType,
                                        themeSrcDirPath: themeSrcDirPath
                                    })), false).forEach(function (pageId) {
                                        var ftlCode = generateFtlFilesCode({ pageId: pageId }).ftlCode;
                                        fs.mkdirSync(themeTypeDirPath, { "recursive": true });
                                        fs.writeFileSync((0, path_1.join)(themeTypeDirPath, pageId), Buffer.from(ftlCode, "utf8"));
                                    });
                                    (0, generateMessageProperties_1.generateMessageProperties)({
                                        themeSrcDirPath: themeSrcDirPath,
                                        themeType: themeType
                                    }).forEach(function (_a) {
                                        var languageTag = _a.languageTag, propertiesFileSource = _a.propertiesFileSource;
                                        var messagesDirPath = (0, path_1.join)(themeTypeDirPath, "messages");
                                        fs.mkdirSync((0, path_1.join)(themeTypeDirPath, "messages"), { "recursive": true });
                                        var propertiesFilePath = (0, path_1.join)(messagesDirPath, "messages_".concat(languageTag, ".properties"));
                                        fs.writeFileSync(propertiesFilePath, Buffer.from(propertiesFileSource, "utf8"));
                                    });
                                    return [4 /*yield*/, (0, downloadKeycloakStaticResources_1.downloadKeycloakStaticResources)({
                                            "keycloakVersion": (function () {
                                                switch (themeType) {
                                                    case "account":
                                                        return constants_1.lastKeycloakVersionWithAccountV1;
                                                    case "login":
                                                        return buildOptions.loginThemeResourcesFromKeycloakVersion;
                                                }
                                            })(),
                                            "themeDirPath": (0, path_1.resolve)((0, path_1.join)(themeTypeDirPath, "..")),
                                            themeType: themeType,
                                            buildOptions: buildOptions
                                        })];
                                case 1:
                                    _g.sent();
                                    fs.writeFileSync((0, path_1.join)(themeTypeDirPath, "theme.properties"), Buffer.from(__spreadArray([
                                        "parent=".concat((function () {
                                            switch (themeType) {
                                                case "account":
                                                    return constants_1.accountV1ThemeName;
                                                case "login":
                                                    return "keycloak";
                                            }
                                            (0, assert_1.assert)(false);
                                        })())
                                    ], __read(((_a = buildOptions.extraThemeProperties) !== null && _a !== void 0 ? _a : [])), false).join("\n\n"), "utf8"));
                                    if (themeType === "account" && buildOptions.doBuildRetrocompatAccountTheme) {
                                        (0, transformCodebase_1.transformCodebase)({
                                            "srcDirPath": themeTypeDirPath,
                                            "destDirPath": getThemeTypeDirPath({ themeType: themeType, "isRetrocompat": true }),
                                            "transformSourceCode": function (_a) {
                                                var filePath = _a.filePath, sourceCode = _a.sourceCode;
                                                if ((0, path_1.basename)(filePath) === "theme.properties") {
                                                    return {
                                                        "modifiedSourceCode": Buffer.from(sourceCode.toString("utf8").replace("parent=".concat(constants_1.accountV1ThemeName), "parent=keycloak"), "utf8")
                                                    };
                                                }
                                                return { "modifiedSourceCode": sourceCode };
                                            }
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    _b = __values(["login", "account"]), _c = _b.next();
                    _e.label = 2;
                case 2:
                    if (!!_c.done) return [3 /*break*/, 5];
                    themeType = _c.value;
                    return [5 /*yield**/, _loop_1(themeType)];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    _c = _b.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    email: {
                        emailThemeSrcDirPath = (0, path_1.join)(themeSrcDirPath, "email");
                        if (!fs.existsSync(emailThemeSrcDirPath)) {
                            break email;
                        }
                        implementedThemeTypes.email = true;
                        (0, transformCodebase_1.transformCodebase)({
                            "srcDirPath": emailThemeSrcDirPath,
                            "destDirPath": getThemeTypeDirPath({ "themeType": "email" })
                        });
                    }
                    parsedKeycloakThemeJson = { "themes": [] };
                    buildOptions.themeNames.forEach(function (themeName) {
                        return parsedKeycloakThemeJson.themes.push({
                            "name": themeName,
                            "types": Object.entries(implementedThemeTypes)
                                .filter(function (_a) {
                                var _b = __read(_a, 2), isImplemented = _b[1];
                                return isImplemented;
                            })
                                .map(function (_a) {
                                var _b = __read(_a, 1), themeType = _b[0];
                                return themeType;
                            })
                        });
                    });
                    if (!implementedThemeTypes.account) {
                        return [3 /*break*/, 10];
                    }
                    return [4 /*yield*/, (0, bringInAccountV1_1.bringInAccountV1)({ buildOptions: buildOptions })];
                case 9:
                    _e.sent();
                    parsedKeycloakThemeJson.themes.push({
                        "name": constants_1.accountV1ThemeName,
                        "types": ["account"]
                    });
                    add_retrocompat_account_theme: {
                        if (!buildOptions.doBuildRetrocompatAccountTheme) {
                            break add_retrocompat_account_theme;
                        }
                        (0, transformCodebase_1.transformCodebase)({
                            "srcDirPath": getThemeTypeDirPath({ "themeType": "account" }),
                            "destDirPath": getThemeTypeDirPath({ "themeType": "account", "isRetrocompat": true }),
                            "transformSourceCode": function (_a) {
                                var filePath = _a.filePath, sourceCode = _a.sourceCode;
                                if ((0, path_1.basename)(filePath) === "theme.properties") {
                                    return {
                                        "modifiedSourceCode": Buffer.from(sourceCode.toString("utf8").replace("parent=".concat(constants_1.accountV1ThemeName), "parent=keycloak"), "utf8")
                                    };
                                }
                                return { "modifiedSourceCode": sourceCode };
                            }
                        });
                        buildOptions.themeNames.forEach(function (themeName) {
                            return parsedKeycloakThemeJson.themes.push({
                                "name": "".concat(themeName).concat(constants_1.retrocompatPostfix),
                                "types": ["account"]
                            });
                        });
                    }
                    _e.label = 10;
                case 10:
                    {
                        keycloakThemeJsonFilePath = (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "src", "main", "resources", "META-INF", "keycloak-themes.json");
                        try {
                            fs.mkdirSync((0, path_1.dirname)(keycloakThemeJsonFilePath));
                        }
                        catch (_f) { }
                        fs.writeFileSync(keycloakThemeJsonFilePath, Buffer.from(JSON.stringify(parsedKeycloakThemeJson, null, 2), "utf8"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.generateTheme = generateTheme;
//# sourceMappingURL=generateTheme.js.map