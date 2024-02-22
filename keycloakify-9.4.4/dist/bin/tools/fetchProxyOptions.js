"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.getProxyFetchOptions = void 0;
var child_process_1 = require("child_process");
var promises_1 = require("fs/promises");
var util_1 = require("util");
function ensureArray(arg0) {
    return Array.isArray(arg0) ? arg0 : typeof arg0 === "undefined" ? [] : [arg0];
}
function ensureSingleOrNone(arg0) {
    if (!Array.isArray(arg0))
        return arg0;
    if (arg0.length === 0)
        return undefined;
    if (arg0.length === 1)
        return arg0[0];
    throw new Error("Illegal configuration, expected a single value but found multiple: " + arg0.map(String).join(", "));
}
/**
 * Get npm configuration as map
 */
function getNmpConfig(params) {
    return __awaiter(this, void 0, void 0, function () {
        var npmWorkspaceRootDirPath, exec, stdout, npmConfigReducer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    npmWorkspaceRootDirPath = params.npmWorkspaceRootDirPath;
                    exec = (0, util_1.promisify)(child_process_1.exec);
                    return [4 /*yield*/, exec("npm config get", { "encoding": "utf8", "cwd": npmWorkspaceRootDirPath }).then(function (_a) {
                            var stdout = _a.stdout;
                            return stdout;
                        })];
                case 1:
                    stdout = _a.sent();
                    npmConfigReducer = function (cfg, _a) {
                        var _b, _c;
                        var _d = __read(_a, 2), key = _d[0], value = _d[1];
                        return key in cfg ? __assign(__assign({}, cfg), (_b = {}, _b[key] = __spreadArray(__spreadArray([], __read(ensureArray(cfg[key])), false), [value], false), _b)) : __assign(__assign({}, cfg), (_c = {}, _c[key] = value, _c));
                    };
                    return [2 /*return*/, stdout
                            .split("\n")
                            .filter(function (line) { return !line.startsWith(";"); })
                            .map(function (line) { return line.trim(); })
                            .map(function (line) { return line.split("=", 2); })
                            .reduce(npmConfigReducer, {})];
            }
        });
    });
}
function getProxyFetchOptions(params) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        function maybeBoolean(arg0) {
            return typeof arg0 === "undefined" ? undefined : Boolean(arg0);
        }
        var npmWorkspaceRootDirPath, cfg, proxy, noProxy, strictSSL, cert, ca, cafile, _d, _e, _f, _g;
        var _this = this;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    npmWorkspaceRootDirPath = params.npmWorkspaceRootDirPath;
                    return [4 /*yield*/, getNmpConfig({ npmWorkspaceRootDirPath: npmWorkspaceRootDirPath })];
                case 1:
                    cfg = _h.sent();
                    proxy = ensureSingleOrNone((_a = cfg["https-proxy"]) !== null && _a !== void 0 ? _a : cfg["proxy"]);
                    noProxy = (_b = cfg["noproxy"]) !== null && _b !== void 0 ? _b : cfg["no-proxy"];
                    strictSSL = maybeBoolean(ensureSingleOrNone(cfg["strict-ssl"]));
                    cert = cfg["cert"];
                    ca = ensureArray((_c = cfg["ca"]) !== null && _c !== void 0 ? _c : cfg["ca[]"]);
                    cafile = ensureSingleOrNone(cfg["cafile"]);
                    if (!(typeof cafile !== "undefined" && cafile !== "null")) return [3 /*break*/, 3];
                    _e = (_d = ca.push).apply;
                    _f = [ca];
                    _g = [[]];
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            function chunks(arr, size) {
                                if (size === void 0) { size = 2; }
                                return arr.map(function (_, i) { return i % size == 0 && arr.slice(i, i + size); }).filter(Boolean);
                            }
                            var cafileContent;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, promises_1.readFile)(cafile, "utf-8")];
                                    case 1:
                                        cafileContent = _a.sent();
                                        return [2 /*return*/, chunks(cafileContent.split(/(-----END CERTIFICATE-----)/), 2).map(function (ca) { return ca.join("").replace(/^\n/, "").replace(/\n/g, "\\n"); })];
                                }
                            });
                        }); })()];
                case 2:
                    _e.apply(_d, _f.concat([__spreadArray.apply(void 0, _g.concat([__read.apply(void 0, [(_h.sent())]), false]))]));
                    _h.label = 3;
                case 3: return [2 /*return*/, { proxy: proxy, noProxy: noProxy, strictSSL: strictSSL, cert: cert, "ca": ca.length === 0 ? undefined : ca }];
            }
        });
    });
}
exports.getProxyFetchOptions = getProxyFetchOptions;
//# sourceMappingURL=fetchProxyOptions.js.map