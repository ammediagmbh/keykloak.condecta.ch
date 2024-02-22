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
exports.bringInAccountV1 = void 0;
var fs = __importStar(require("fs"));
var path_1 = require("path");
var assert_1 = require("tsafe/assert");
var Reflect_1 = require("tsafe/Reflect");
var constants_1 = require("../../constants");
var download_builtin_keycloak_theme_1 = require("../../download-builtin-keycloak-theme");
var transformCodebase_1 = require("../../tools/transformCodebase");
var fs_rmSync_1 = require("../../tools/fs.rmSync");
{
    var buildOptions = (0, Reflect_1.Reflect)();
    (0, assert_1.assert)();
}
function bringInAccountV1(params) {
    return __awaiter(this, void 0, void 0, function () {
        var buildOptions, builtinKeycloakThemeTmpDirPath, accountV1DirPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buildOptions = params.buildOptions;
                    builtinKeycloakThemeTmpDirPath = (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "..", "tmp_yxdE2_builtin_keycloak_theme");
                    return [4 /*yield*/, (0, download_builtin_keycloak_theme_1.downloadBuiltinKeycloakTheme)({
                            "destDirPath": builtinKeycloakThemeTmpDirPath,
                            "keycloakVersion": constants_1.lastKeycloakVersionWithAccountV1,
                            buildOptions: buildOptions
                        })];
                case 1:
                    _a.sent();
                    accountV1DirPath = (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "src", "main", "resources", "theme", constants_1.accountV1ThemeName, "account");
                    (0, transformCodebase_1.transformCodebase)({
                        "srcDirPath": (0, path_1.join)(builtinKeycloakThemeTmpDirPath, "base", "account"),
                        "destDirPath": accountV1DirPath
                    });
                    (0, transformCodebase_1.transformCodebase)({
                        "srcDirPath": (0, path_1.join)(builtinKeycloakThemeTmpDirPath, "keycloak", "account", "resources"),
                        "destDirPath": (0, path_1.join)(accountV1DirPath, "resources")
                    });
                    (0, transformCodebase_1.transformCodebase)({
                        "srcDirPath": (0, path_1.join)(builtinKeycloakThemeTmpDirPath, "keycloak", "common", "resources"),
                        "destDirPath": (0, path_1.join)(accountV1DirPath, "resources", constants_1.resources_common)
                    });
                    (0, fs_rmSync_1.rmSync)(builtinKeycloakThemeTmpDirPath, { "recursive": true });
                    fs.writeFileSync((0, path_1.join)(accountV1DirPath, "theme.properties"), Buffer.from([
                        "accountResourceProvider=account-v1",
                        "",
                        "locales=ar,ca,cs,da,de,en,es,fr,fi,hu,it,ja,lt,nl,no,pl,pt-BR,ru,sk,sv,tr,zh-CN",
                        "",
                        "styles=" +
                            __spreadArray([
                                "css/account.css",
                                "img/icon-sidebar-active.png",
                                "img/logo.png"
                            ], __read(["patternfly.min.css", "patternfly-additions.min.css", "patternfly-additions.min.css"].map(function (fileBasename) { return "".concat(constants_1.resources_common, "/node_modules/patternfly/dist/css/").concat(fileBasename); })), false).join(" "),
                        "",
                        "##### css classes for form buttons",
                        "# main class used for all buttons",
                        "kcButtonClass=btn",
                        "# classes defining priority of the button - primary or default (there is typically only one priority button for the form)",
                        "kcButtonPrimaryClass=btn-primary",
                        "kcButtonDefaultClass=btn-default",
                        "# classes defining size of the button",
                        "kcButtonLargeClass=btn-lg",
                        ""
                    ].join("\n"), "utf8"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.bringInAccountV1 = bringInAccountV1;
//# sourceMappingURL=bringInAccountV1.js.map