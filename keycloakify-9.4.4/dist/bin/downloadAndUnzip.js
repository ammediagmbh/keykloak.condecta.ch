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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndUnzip = void 0;
var crypto_1 = require("crypto");
var promises_1 = require("fs/promises");
var make_fetch_happen_1 = __importDefault(require("make-fetch-happen"));
var path_1 = require("path");
var assert_1 = require("tsafe/assert");
var transformCodebase_1 = require("./tools/transformCodebase");
var unzip_1 = require("./tools/unzip");
var fs_rm_1 = require("./tools/fs.rm");
var child_process = __importStar(require("child_process"));
var fs_existsAsync_1 = require("./tools/fs.existsAsync");
var fetchProxyOptions_1 = require("./tools/fetchProxyOptions");
(0, assert_1.assert)();
function downloadAndUnzip(params) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var url, destDirPath, specificDirsToExtract, preCacheTransform, buildOptions, _b, extractDirPath, zipFilePath, _c, response, isFromRemoteCache, error_1, githubToken;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    url = params.url, destDirPath = params.destDirPath, specificDirsToExtract = params.specificDirsToExtract, preCacheTransform = params.preCacheTransform, buildOptions = params.buildOptions;
                    _b = (function () {
                        var zipFileBasenameWithoutExt = generateFileNameFromURL({
                            url: url,
                            "preCacheTransform": preCacheTransform === undefined
                                ? undefined
                                : {
                                    "actionCacheId": preCacheTransform.actionCacheId,
                                    "actionFootprint": preCacheTransform.action.toString()
                                }
                        });
                        var zipFilePath = (0, path_1.join)(buildOptions.cacheDirPath, "".concat(zipFileBasenameWithoutExt, ".zip"));
                        var extractDirPath = (0, path_1.join)(buildOptions.cacheDirPath, "tmp_unzip_".concat(zipFileBasenameWithoutExt));
                        return { zipFilePath: zipFilePath, extractDirPath: extractDirPath };
                    })(), extractDirPath = _b.extractDirPath, zipFilePath = _b.zipFilePath;
                    return [4 /*yield*/, (0, fs_existsAsync_1.existsAsync)(zipFilePath)];
                case 1:
                    if (_d.sent()) {
                        return [3 /*break*/, 14];
                    }
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var proxyFetchOptions, response, _a;
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, (0, fetchProxyOptions_1.getProxyFetchOptions)({
                                            "npmWorkspaceRootDirPath": buildOptions.npmWorkspaceRootDirPath
                                        })];
                                    case 1:
                                        proxyFetchOptions = _c.sent();
                                        return [4 /*yield*/, (0, make_fetch_happen_1.default)("https://github.com/keycloakify/keycloakify/releases/download/v0.0.1/".concat((0, path_1.basename)(zipFilePath)), proxyFetchOptions)];
                                    case 2:
                                        response = _c.sent();
                                        if (response.status === 200) {
                                            return [2 /*return*/, {
                                                    response: response,
                                                    "isFromRemoteCache": true
                                                }];
                                        }
                                        _b = {};
                                        _a = "response";
                                        return [4 /*yield*/, (0, make_fetch_happen_1.default)(url, proxyFetchOptions)];
                                    case 3: return [2 /*return*/, (_b[_a] = _c.sent(),
                                            _b["isFromRemoteCache"] = false,
                                            _b)];
                                }
                            });
                        }); })()];
                case 2:
                    _c = _d.sent(), response = _c.response, isFromRemoteCache = _c.isFromRemoteCache;
                    return [4 /*yield*/, (0, promises_1.mkdir)((0, path_1.dirname)(zipFilePath), { "recursive": true })];
                case 3:
                    _d.sent();
                    /**
                     * The correct way to fix this is to upgrade node-fetch beyond 3.2.5
                     * (see https://github.com/node-fetch/node-fetch/issues/1295#issuecomment-1144061991.)
                     * Unfortunately, octokit (a dependency of keycloakify) also uses node-fetch, and
                     * does not support node-fetch 3.x. So we stick around with this band-aid until
                     * octokit upgrades.
                     */
                    (_a = response.body) === null || _a === void 0 ? void 0 : _a.setMaxListeners(Number.MAX_VALUE);
                    (0, assert_1.assert)(typeof response.body !== "undefined" && response.body != null);
                    return [4 /*yield*/, (0, promises_1.writeFile)(zipFilePath, response.body)];
                case 4:
                    _d.sent();
                    if (isFromRemoteCache) {
                        return [3 /*break*/, 14];
                    }
                    if (specificDirsToExtract === undefined && preCacheTransform === undefined) {
                        return [3 /*break*/, 14];
                    }
                    return [4 /*yield*/, (0, unzip_1.unzip)(zipFilePath, extractDirPath, specificDirsToExtract)];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 8, , 10]);
                    return [4 /*yield*/, (preCacheTransform === null || preCacheTransform === void 0 ? void 0 : preCacheTransform.action({
                            "destDirPath": extractDirPath
                        }))];
                case 7:
                    _d.sent();
                    return [3 /*break*/, 10];
                case 8:
                    error_1 = _d.sent();
                    return [4 /*yield*/, Promise.all([(0, fs_rm_1.rm)(extractDirPath, { "recursive": true }), (0, promises_1.unlink)(zipFilePath)])];
                case 9:
                    _d.sent();
                    throw error_1;
                case 10: return [4 /*yield*/, (0, promises_1.unlink)(zipFilePath)];
                case 11:
                    _d.sent();
                    return [4 /*yield*/, (0, unzip_1.zip)(extractDirPath, zipFilePath)];
                case 12:
                    _d.sent();
                    return [4 /*yield*/, (0, fs_rm_1.rm)(extractDirPath, { "recursive": true })];
                case 13:
                    _d.sent();
                    upload_to_remot_cache_if_admin: {
                        githubToken = process.env["KEYCLOAKIFY_ADMIN_GITHUB_PERSONAL_ACCESS_TOKEN"];
                        if (githubToken === undefined) {
                            break upload_to_remot_cache_if_admin;
                        }
                        console.log("uploading to remote cache");
                        try {
                            child_process.execSync("which putasset");
                        }
                        catch (_e) {
                            child_process.execSync("npm install -g putasset");
                        }
                        try {
                            child_process.execFileSync("putasset", [
                                "--owner",
                                "keycloakify",
                                "--repo",
                                "keycloakify",
                                "--tag",
                                "v0.0.1",
                                "--filename",
                                zipFilePath,
                                "--token",
                                githubToken
                            ]);
                        }
                        catch (_f) {
                            console.log("upload failed, asset probably already exists in remote cache");
                        }
                    }
                    _d.label = 14;
                case 14: return [4 /*yield*/, (0, unzip_1.unzip)(zipFilePath, extractDirPath)];
                case 15:
                    _d.sent();
                    (0, transformCodebase_1.transformCodebase)({
                        "srcDirPath": extractDirPath,
                        "destDirPath": destDirPath
                    });
                    return [4 /*yield*/, (0, fs_rm_1.rm)(extractDirPath, { "recursive": true })];
                case 16:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.downloadAndUnzip = downloadAndUnzip;
function generateFileNameFromURL(params) {
    var preCacheTransform = params.preCacheTransform;
    // Parse the URL
    var url = new URL(params.url);
    // Extract pathname and remove leading slashes
    var fileName = url.pathname.replace(/^\//, "").replace(/\//g, "_");
    // Optionally, add query parameters replacing special characters
    if (url.search) {
        fileName += url.search.replace(/[&=?]/g, "-");
    }
    // Replace any characters that are not valid in filenames
    fileName = fileName.replace(/[^a-zA-Z0-9-_]/g, "");
    // Trim or pad the fileName to a specific length
    fileName = fileName.substring(0, 50);
    add_pre_cache_transform: {
        if (preCacheTransform === undefined) {
            break add_pre_cache_transform;
        }
        // Sanitize actionCacheId the same way as other components
        var sanitizedActionCacheId = preCacheTransform.actionCacheId.replace(/[^a-zA-Z0-9-_]/g, "_");
        fileName += "_".concat(sanitizedActionCacheId, "_").concat((0, crypto_1.createHash)("sha256").update(preCacheTransform.actionFootprint).digest("hex").substring(0, 5));
    }
    return fileName;
}
//# sourceMappingURL=downloadAndUnzip.js.map