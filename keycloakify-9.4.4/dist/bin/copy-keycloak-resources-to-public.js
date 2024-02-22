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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
exports.generateKeycloakifyBuildinfoRaw = exports.copyKeycloakResourcesToPublic = void 0;
var downloadKeycloakStaticResources_1 = require("./keycloakify/generateTheme/downloadKeycloakStaticResources");
var path_1 = require("path");
var buildOptions_1 = require("./keycloakify/buildOptions");
var constants_1 = require("./constants");
var readThisNpmProjectVersion_1 = require("./tools/readThisNpmProjectVersion");
var assert_1 = require("tsafe/assert");
var fs = __importStar(require("fs"));
var fs_rmSync_1 = require("./tools/fs.rmSync");
function copyKeycloakResourcesToPublic(params) {
    return __awaiter(this, void 0, void 0, function () {
        var processArgv, buildOptions, destDirPath, keycloakifyBuildinfoFilePath, keycloakifyBuildinfoRaw, keycloakifyBuildinfoRaw_previousRun, _loop_1, themeTypes_1, themeTypes_1_1, themeType, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    processArgv = params.processArgv;
                    buildOptions = (0, buildOptions_1.readBuildOptions)({ processArgv: processArgv });
                    destDirPath = (0, path_1.join)(buildOptions.publicDirPath, constants_1.keycloak_resources);
                    keycloakifyBuildinfoFilePath = (0, path_1.join)(destDirPath, "keycloakify.buildinfo");
                    keycloakifyBuildinfoRaw = generateKeycloakifyBuildinfoRaw({
                        destDirPath: destDirPath,
                        "keycloakifyVersion": (0, readThisNpmProjectVersion_1.readThisNpmProjectVersion)(),
                        buildOptions: buildOptions
                    }).keycloakifyBuildinfoRaw;
                    skip_if_already_done: {
                        if (!fs.existsSync(keycloakifyBuildinfoFilePath)) {
                            break skip_if_already_done;
                        }
                        keycloakifyBuildinfoRaw_previousRun = fs.readFileSync(keycloakifyBuildinfoFilePath).toString("utf8");
                        if (keycloakifyBuildinfoRaw_previousRun !== keycloakifyBuildinfoRaw) {
                            break skip_if_already_done;
                        }
                        return [2 /*return*/];
                    }
                    (0, fs_rmSync_1.rmSync)(destDirPath, { "force": true, "recursive": true });
                    _loop_1 = function (themeType) {
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0: return [4 /*yield*/, (0, downloadKeycloakStaticResources_1.downloadKeycloakStaticResources)({
                                        "keycloakVersion": (function () {
                                            switch (themeType) {
                                                case "login":
                                                    return buildOptions.loginThemeResourcesFromKeycloakVersion;
                                                case "account":
                                                    return constants_1.lastKeycloakVersionWithAccountV1;
                                            }
                                        })(),
                                        themeType: themeType,
                                        "themeDirPath": destDirPath,
                                        buildOptions: buildOptions
                                    })];
                                case 1:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    themeTypes_1 = __values(constants_1.themeTypes), themeTypes_1_1 = themeTypes_1.next();
                    _b.label = 2;
                case 2:
                    if (!!themeTypes_1_1.done) return [3 /*break*/, 5];
                    themeType = themeTypes_1_1.value;
                    return [5 /*yield**/, _loop_1(themeType)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    themeTypes_1_1 = themeTypes_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (themeTypes_1_1 && !themeTypes_1_1.done && (_a = themeTypes_1.return)) _a.call(themeTypes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    fs.writeFileSync((0, path_1.join)(destDirPath, "README.txt"), Buffer.from(
                    // prettier-ignore
                    [
                        "This is just a test folder that helps develop",
                        "the login and register page without having to run a Keycloak container"
                    ].join(" ")));
                    fs.writeFileSync((0, path_1.join)(buildOptions.publicDirPath, constants_1.keycloak_resources, ".gitignore"), Buffer.from("*", "utf8"));
                    fs.writeFileSync(keycloakifyBuildinfoFilePath, Buffer.from(keycloakifyBuildinfoRaw, "utf8"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.copyKeycloakResourcesToPublic = copyKeycloakResourcesToPublic;
function generateKeycloakifyBuildinfoRaw(params) {
    var destDirPath = params.destDirPath, keycloakifyVersion = params.keycloakifyVersion, buildOptions = params.buildOptions;
    var cacheDirPath = buildOptions.cacheDirPath, npmWorkspaceRootDirPath = buildOptions.npmWorkspaceRootDirPath, loginThemeResourcesFromKeycloakVersion = buildOptions.loginThemeResourcesFromKeycloakVersion, rest = __rest(buildOptions, ["cacheDirPath", "npmWorkspaceRootDirPath", "loginThemeResourcesFromKeycloakVersion"]);
    (0, assert_1.assert)(true);
    var keycloakifyBuildinfoRaw = JSON.stringify({
        keycloakifyVersion: keycloakifyVersion,
        "buildOptions": {
            loginThemeResourcesFromKeycloakVersion: loginThemeResourcesFromKeycloakVersion,
            "cacheDirPath": (0, path_1.relative)(destDirPath, cacheDirPath),
            "npmWorkspaceRootDirPath": (0, path_1.relative)(destDirPath, npmWorkspaceRootDirPath)
        }
    }, null, 2);
    return { keycloakifyBuildinfoRaw: keycloakifyBuildinfoRaw };
}
exports.generateKeycloakifyBuildinfoRaw = generateKeycloakifyBuildinfoRaw;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, copyKeycloakResourcesToPublic({
                        "processArgv": process.argv.slice(2)
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=copy-keycloak-resources-to-public.js.map