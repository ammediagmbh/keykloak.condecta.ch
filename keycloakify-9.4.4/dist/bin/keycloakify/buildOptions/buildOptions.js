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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBuildOptions = void 0;
var url_1 = require("url");
var parsedPackageJson_1 = require("./parsedPackageJson");
var path_1 = require("path");
var minimist_1 = __importDefault(require("minimist"));
var getAbsoluteAndInOsFormatPath_1 = require("../../tools/getAbsoluteAndInOsFormatPath");
var resolvedViteConfig_1 = require("./resolvedViteConfig");
var fs = __importStar(require("fs"));
var getCacheDirPath_1 = require("./getCacheDirPath");
var getReactAppRootDirPath_1 = require("./getReactAppRootDirPath");
var getNpmWorkspaceRootDirPath_1 = require("./getNpmWorkspaceRootDirPath");
function readBuildOptions(params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var processArgv = params.processArgv;
    var reactAppRootDirPath = (0, getReactAppRootDirPath_1.getReactAppRootDirPath)({ processArgv: processArgv }).reactAppRootDirPath;
    var cacheDirPath = (0, getCacheDirPath_1.getCacheDirPath)({ reactAppRootDirPath: reactAppRootDirPath }).cacheDirPath;
    var resolvedViteConfig = (0, resolvedViteConfig_1.readResolvedViteConfig)({ cacheDirPath: cacheDirPath }).resolvedViteConfig;
    if (resolvedViteConfig === undefined && fs.existsSync((0, path_1.join)(reactAppRootDirPath, "vite.config.ts"))) {
        throw new Error("Keycloakify's Vite plugin output not found");
    }
    var parsedPackageJson = (0, parsedPackageJson_1.readParsedPackageJson)({ reactAppRootDirPath: reactAppRootDirPath });
    var themeNames = (function () {
        var _a;
        if (((_a = parsedPackageJson.keycloakify) === null || _a === void 0 ? void 0 : _a.themeName) === undefined) {
            return [
                parsedPackageJson.name
                    .replace(/^@(.*)/, "$1")
                    .split("/")
                    .join("-")
            ];
        }
        if (typeof parsedPackageJson.keycloakify.themeName === "string") {
            return [parsedPackageJson.keycloakify.themeName];
        }
        return parsedPackageJson.keycloakify.themeName;
    })();
    var reactAppBuildDirPath = (function () {
        var _a, _b;
        webpack: {
            if (resolvedViteConfig !== undefined) {
                break webpack;
            }
            if (((_a = parsedPackageJson.keycloakify) === null || _a === void 0 ? void 0 : _a.reactAppBuildDirPath) !== undefined) {
                return (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
                    "pathIsh": (_b = parsedPackageJson.keycloakify) === null || _b === void 0 ? void 0 : _b.reactAppBuildDirPath,
                    "cwd": reactAppRootDirPath
                });
            }
            return (0, path_1.join)(reactAppRootDirPath, "build");
        }
        return (0, path_1.join)(reactAppRootDirPath, resolvedViteConfig.buildDir);
    })();
    var argv = (0, minimist_1.default)(processArgv);
    var npmWorkspaceRootDirPath = (0, getNpmWorkspaceRootDirPath_1.getNpmWorkspaceRootDirPath)({ reactAppRootDirPath: reactAppRootDirPath }).npmWorkspaceRootDirPath;
    return {
        "bundler": resolvedViteConfig !== undefined ? "vite" : "webpack",
        "isSilent": typeof argv["silent"] === "boolean" ? argv["silent"] : false,
        "themeVersion": (_b = (_a = process.env.KEYCLOAKIFY_THEME_VERSION) !== null && _a !== void 0 ? _a : parsedPackageJson.version) !== null && _b !== void 0 ? _b : "0.0.0",
        themeNames: themeNames,
        "extraThemeProperties": (_c = parsedPackageJson.keycloakify) === null || _c === void 0 ? void 0 : _c.extraThemeProperties,
        "groupId": (function () {
            var _a, _b, _c, _d, _e, _f;
            var fallbackGroupId = "".concat(themeNames[0], ".keycloak");
            return ((_c = (_a = process.env.KEYCLOAKIFY_GROUP_ID) !== null && _a !== void 0 ? _a : (_b = parsedPackageJson.keycloakify) === null || _b === void 0 ? void 0 : _b.groupId) !== null && _c !== void 0 ? _c : (parsedPackageJson.homepage === undefined
                ? fallbackGroupId
                : (_f = (_e = (_d = (0, url_1.parse)(parsedPackageJson.homepage)
                    .host) === null || _d === void 0 ? void 0 : _d.replace(/:[0-9]+$/, "")) === null || _e === void 0 ? void 0 : _e.split(".").reverse().join(".")) !== null && _f !== void 0 ? _f : fallbackGroupId) + ".keycloak");
        })(),
        "artifactId": (_f = (_d = process.env.KEYCLOAKIFY_ARTIFACT_ID) !== null && _d !== void 0 ? _d : (_e = parsedPackageJson.keycloakify) === null || _e === void 0 ? void 0 : _e.artifactId) !== null && _f !== void 0 ? _f : "".concat(themeNames[0], "-keycloak-theme"),
        "doCreateJar": (_h = (_g = parsedPackageJson.keycloakify) === null || _g === void 0 ? void 0 : _g.doCreateJar) !== null && _h !== void 0 ? _h : true,
        "loginThemeResourcesFromKeycloakVersion": (_k = (_j = parsedPackageJson.keycloakify) === null || _j === void 0 ? void 0 : _j.loginThemeResourcesFromKeycloakVersion) !== null && _k !== void 0 ? _k : "11.0.3",
        reactAppRootDirPath: reactAppRootDirPath,
        reactAppBuildDirPath: reactAppBuildDirPath,
        "keycloakifyBuildDirPath": (function () {
            var _a, _b;
            if (((_a = parsedPackageJson.keycloakify) === null || _a === void 0 ? void 0 : _a.keycloakifyBuildDirPath) !== undefined) {
                return (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
                    "pathIsh": (_b = parsedPackageJson.keycloakify) === null || _b === void 0 ? void 0 : _b.keycloakifyBuildDirPath,
                    "cwd": reactAppRootDirPath
                });
            }
            return (resolvedViteConfig === null || resolvedViteConfig === void 0 ? void 0 : resolvedViteConfig.buildDir) === undefined ? "build_keycloak" : "".concat(resolvedViteConfig.buildDir, "_keycloak");
        })(),
        "publicDirPath": (function () {
            webpack: {
                if (resolvedViteConfig !== undefined) {
                    break webpack;
                }
                if (process.env.PUBLIC_DIR_PATH !== undefined) {
                    return (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
                        "pathIsh": process.env.PUBLIC_DIR_PATH,
                        "cwd": reactAppRootDirPath
                    });
                }
                return (0, path_1.join)(reactAppRootDirPath, "public");
            }
            return (0, path_1.join)(reactAppRootDirPath, resolvedViteConfig.publicDir);
        })(),
        cacheDirPath: cacheDirPath,
        "urlPathname": (function () {
            webpack: {
                if (resolvedViteConfig !== undefined) {
                    break webpack;
                }
                var homepage = parsedPackageJson.homepage;
                var url = undefined;
                if (homepage !== undefined) {
                    url = new URL(homepage);
                }
                if (url === undefined) {
                    return undefined;
                }
                var out = url.pathname.replace(/([^/])$/, "$1/");
                return out === "/" ? undefined : out;
            }
            return resolvedViteConfig.urlPathname;
        })(),
        "assetsDirPath": (function () {
            webpack: {
                if (resolvedViteConfig !== undefined) {
                    break webpack;
                }
                return (0, path_1.join)(reactAppBuildDirPath, "static");
            }
            return (0, path_1.join)(reactAppBuildDirPath, resolvedViteConfig.assetsDir);
        })(),
        "doBuildRetrocompatAccountTheme": (_m = (_l = parsedPackageJson.keycloakify) === null || _l === void 0 ? void 0 : _l.doBuildRetrocompatAccountTheme) !== null && _m !== void 0 ? _m : true,
        npmWorkspaceRootDirPath: npmWorkspaceRootDirPath
    };
}
exports.readBuildOptions = readBuildOptions;
//# sourceMappingURL=buildOptions.js.map