#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadBuiltinKeycloakTheme = void 0;
var path_1 = require("path");
var downloadAndUnzip_1 = require("./downloadAndUnzip");
var promptKeycloakVersion_1 = require("./promptKeycloakVersion");
var logger_1 = require("./tools/logger");
var buildOptions_1 = require("./keycloakify/buildOptions");
var assert_1 = require("tsafe/assert");
var child_process = __importStar(require("child_process"));
var fs = __importStar(require("fs"));
var fs_rmSync_1 = require("./tools/fs.rmSync");
var constants_1 = require("./constants");
var transformCodebase_1 = require("./tools/transformCodebase");
(0, assert_1.assert)();
function downloadBuiltinKeycloakTheme(params) {
    return __awaiter(this, void 0, void 0, function () {
        var keycloakVersion, destDirPath, buildOptions;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keycloakVersion = params.keycloakVersion, destDirPath = params.destDirPath, buildOptions = params.buildOptions;
                    return [4 /*yield*/, (0, downloadAndUnzip_1.downloadAndUnzip)({
                            destDirPath: destDirPath,
                            "url": "https://github.com/keycloak/keycloak/archive/refs/tags/".concat(keycloakVersion, ".zip"),
                            "specificDirsToExtract": ["", "-community"].map(function (ext) { return "keycloak-".concat(keycloakVersion, "/themes/src/main/resources").concat(ext, "/theme"); }),
                            buildOptions: buildOptions,
                            "preCacheTransform": {
                                "actionCacheId": "npm install and build",
                                "action": function (_a) {
                                    var destDirPath = _a.destDirPath;
                                    return __awaiter(_this, void 0, void 0, function () {
                                        var commonResourcesDirPath, keycloakV2DirPath, nodeModuleDirPath, toDeletePerfixes_1, libDirPath, toDeletePerfixes_2, accountCssFilePath, totpFtlFilePath, nodeModulesDirPath, toKeepPrefixes_1;
                                        return __generator(this, function (_b) {
                                            install_common_node_modules: {
                                                commonResourcesDirPath = (0, path_1.join)(destDirPath, "keycloak", "common", "resources");
                                                if (!fs.existsSync(commonResourcesDirPath)) {
                                                    break install_common_node_modules;
                                                }
                                                if (!fs.existsSync((0, path_1.join)(commonResourcesDirPath, "package.json"))) {
                                                    break install_common_node_modules;
                                                }
                                                if (fs.existsSync((0, path_1.join)(commonResourcesDirPath, "node_modules"))) {
                                                    break install_common_node_modules;
                                                }
                                                child_process.execSync("npm install --omit=dev", {
                                                    "cwd": commonResourcesDirPath,
                                                    "stdio": "ignore"
                                                });
                                            }
                                            remove_keycloak_v2: {
                                                keycloakV2DirPath = (0, path_1.join)(destDirPath, "keycloak.v2");
                                                if (!fs.existsSync(keycloakV2DirPath)) {
                                                    break remove_keycloak_v2;
                                                }
                                                (0, fs_rmSync_1.rmSync)(keycloakV2DirPath, { "recursive": true });
                                            }
                                            // Note, this is an optimization for reducing the size of the jar
                                            remove_unused_node_modules: {
                                                nodeModuleDirPath = (0, path_1.join)(destDirPath, "keycloak", "common", "resources", "node_modules");
                                                if (!fs.existsSync(nodeModuleDirPath)) {
                                                    break remove_unused_node_modules;
                                                }
                                                toDeletePerfixes_1 = [
                                                    "angular",
                                                    "bootstrap",
                                                    "rcue",
                                                    "font-awesome",
                                                    "ng-file-upload",
                                                    (0, path_1.join)("patternfly", "dist", "sass"),
                                                    (0, path_1.join)("patternfly", "dist", "less"),
                                                    (0, path_1.join)("patternfly", "dist", "js"),
                                                    "d3",
                                                    (0, path_1.join)("jquery", "src"),
                                                    "c3",
                                                    "core-js",
                                                    "eonasdan-bootstrap-datetimepicker",
                                                    "moment",
                                                    "react",
                                                    "patternfly-bootstrap-treeview",
                                                    "popper.js",
                                                    "tippy.js",
                                                    "jquery-match-height",
                                                    "google-code-prettify",
                                                    "patternfly-bootstrap-combobox",
                                                    "focus-trap",
                                                    "tabbable",
                                                    "scheduler",
                                                    "@types",
                                                    "datatables.net",
                                                    "datatables.net-colreorder",
                                                    "tslib",
                                                    "prop-types",
                                                    "file-selector",
                                                    "datatables.net-colreorder-bs",
                                                    "object-assign",
                                                    "warning",
                                                    "js-tokens",
                                                    "loose-envify",
                                                    "prop-types-extra",
                                                    "attr-accept",
                                                    "datatables.net-select",
                                                    "drmonty-datatables-colvis",
                                                    "datatables.net-bs",
                                                    (0, path_1.join)("@patternfly", "react"),
                                                    (0, path_1.join)("@patternfly", "patternfly", "docs")
                                                ];
                                                (0, transformCodebase_1.transformCodebase)({
                                                    "srcDirPath": nodeModuleDirPath,
                                                    "destDirPath": nodeModuleDirPath,
                                                    "transformSourceCode": function (_a) {
                                                        var sourceCode = _a.sourceCode, fileRelativePath = _a.fileRelativePath;
                                                        if (fileRelativePath.endsWith(".map")) {
                                                            return undefined;
                                                        }
                                                        if (toDeletePerfixes_1.find(function (prefix) { return fileRelativePath.startsWith(prefix); }) !== undefined) {
                                                            return undefined;
                                                        }
                                                        if (fileRelativePath.startsWith((0, path_1.join)("patternfly", "dist", "fonts"))) {
                                                            if (!fileRelativePath.endsWith(".woff2") &&
                                                                !fileRelativePath.endsWith(".woff") &&
                                                                !fileRelativePath.endsWith(".ttf")) {
                                                                return undefined;
                                                            }
                                                        }
                                                        return { "modifiedSourceCode": sourceCode };
                                                    }
                                                });
                                            }
                                            // Just like node_modules
                                            remove_unused_lib: {
                                                libDirPath = (0, path_1.join)(destDirPath, "keycloak", "common", "resources", "lib");
                                                if (!fs.existsSync(libDirPath)) {
                                                    break remove_unused_lib;
                                                }
                                                toDeletePerfixes_2 = ["ui-ace", "filesaver", "fileupload", "angular", "ui-ace", "pficon"];
                                                (0, transformCodebase_1.transformCodebase)({
                                                    "srcDirPath": libDirPath,
                                                    "destDirPath": libDirPath,
                                                    "transformSourceCode": function (_a) {
                                                        var sourceCode = _a.sourceCode, fileRelativePath = _a.fileRelativePath;
                                                        if (fileRelativePath.endsWith(".map")) {
                                                            return undefined;
                                                        }
                                                        if (toDeletePerfixes_2.find(function (prefix) { return fileRelativePath.startsWith(prefix); }) !== undefined) {
                                                            return undefined;
                                                        }
                                                        return { "modifiedSourceCode": sourceCode };
                                                    }
                                                });
                                            }
                                            last_account_v1_transformations: {
                                                if (constants_1.lastKeycloakVersionWithAccountV1 !== keycloakVersion) {
                                                    break last_account_v1_transformations;
                                                }
                                                {
                                                    accountCssFilePath = (0, path_1.join)(destDirPath, "keycloak", "account", "resources", "css", "account.css");
                                                    fs.writeFileSync(accountCssFilePath, Buffer.from(fs.readFileSync(accountCssFilePath).toString("utf8").replace("top: -34px;", "top: -34px !important;"), "utf8"));
                                                }
                                                {
                                                    totpFtlFilePath = (0, path_1.join)(destDirPath, "base", "account", "totp.ftl");
                                                    fs.writeFileSync(totpFtlFilePath, Buffer.from(fs
                                                        .readFileSync(totpFtlFilePath)
                                                        .toString("utf8")
                                                        .replace([
                                                        "                <#list totp.policy.supportedApplications as app>",
                                                        "                    <li>${app}</li>",
                                                        "                </#list>"
                                                    ].join("\n"), [
                                                        "                <#if totp.policy.supportedApplications?has_content>",
                                                        "                    <#list totp.policy.supportedApplications as app>",
                                                        "                        <li>${app}</li>",
                                                        "                    </#list>",
                                                        "                </#if>"
                                                    ].join("\n")), "utf8"));
                                                }
                                                // Note, this is an optimization for reducing the size of the jar,
                                                // For this version we know exactly which resources are used.
                                                {
                                                    nodeModulesDirPath = (0, path_1.join)(destDirPath, "keycloak", "common", "resources", "node_modules");
                                                    toKeepPrefixes_1 = __spreadArray(__spreadArray([], __read(["patternfly.min.css", "patternfly-additions.min.css", "patternfly-additions.min.css"].map(function (fileBasename) {
                                                        return (0, path_1.join)("patternfly", "dist", "css", fileBasename);
                                                    })), false), [
                                                        (0, path_1.join)("patternfly", "dist", "fonts")
                                                    ], false);
                                                    (0, transformCodebase_1.transformCodebase)({
                                                        "srcDirPath": nodeModulesDirPath,
                                                        "destDirPath": nodeModulesDirPath,
                                                        "transformSourceCode": function (_a) {
                                                            var sourceCode = _a.sourceCode, fileRelativePath = _a.fileRelativePath;
                                                            if (toKeepPrefixes_1.find(function (prefix) { return fileRelativePath.startsWith(prefix); }) === undefined) {
                                                                return undefined;
                                                            }
                                                            return { "modifiedSourceCode": sourceCode };
                                                        }
                                                    });
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    });
                                }
                            }
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.downloadBuiltinKeycloakTheme = downloadBuiltinKeycloakTheme;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var buildOptions, logger, keycloakVersion, destDirPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buildOptions = (0, buildOptions_1.readBuildOptions)({
                        "processArgv": process.argv.slice(2)
                    });
                    logger = (0, logger_1.getLogger)({ "isSilent": buildOptions.isSilent });
                    return [4 /*yield*/, (0, promptKeycloakVersion_1.promptKeycloakVersion)()];
                case 1:
                    keycloakVersion = (_a.sent()).keycloakVersion;
                    destDirPath = (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "src", "main", "resources", "theme");
                    logger.log("Downloading builtins theme of Keycloak ".concat(keycloakVersion, " here ").concat(destDirPath));
                    return [4 /*yield*/, downloadBuiltinKeycloakTheme({
                            keycloakVersion: keycloakVersion,
                            destDirPath: destDirPath,
                            buildOptions: buildOptions
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=download-builtin-keycloak-theme.js.map