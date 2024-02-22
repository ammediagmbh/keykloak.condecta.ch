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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var download_builtin_keycloak_theme_1 = require("./download-builtin-keycloak-theme");
var path_1 = require("path");
var transformCodebase_1 = require("./tools/transformCodebase");
var promptKeycloakVersion_1 = require("./promptKeycloakVersion");
var buildOptions_1 = require("./keycloakify/buildOptions");
var fs = __importStar(require("fs"));
var logger_1 = require("./tools/logger");
var getThemeSrcDirPath_1 = require("./getThemeSrcDirPath");
var fs_rmSync_1 = require("./tools/fs.rmSync");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var buildOptions, logger, themeSrcDirPath, emailThemeSrcDirPath, keycloakVersion, builtinKeycloakThemeTmpDirPath, themePropertyFilePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buildOptions = (0, buildOptions_1.readBuildOptions)({
                        "processArgv": process.argv.slice(2)
                    });
                    logger = (0, logger_1.getLogger)({ "isSilent": buildOptions.isSilent });
                    themeSrcDirPath = (0, getThemeSrcDirPath_1.getThemeSrcDirPath)({
                        "reactAppRootDirPath": buildOptions.reactAppRootDirPath
                    }).themeSrcDirPath;
                    emailThemeSrcDirPath = (0, path_1.join)(themeSrcDirPath, "email");
                    if (fs.existsSync(emailThemeSrcDirPath)) {
                        logger.warn("There is already a ".concat((0, path_1.relative)(process.cwd(), emailThemeSrcDirPath), " directory in your project. Aborting."));
                        process.exit(-1);
                    }
                    return [4 /*yield*/, (0, promptKeycloakVersion_1.promptKeycloakVersion)()];
                case 1:
                    keycloakVersion = (_a.sent()).keycloakVersion;
                    builtinKeycloakThemeTmpDirPath = (0, path_1.join)(emailThemeSrcDirPath, "..", "tmp_xIdP3_builtin_keycloak_theme");
                    return [4 /*yield*/, (0, download_builtin_keycloak_theme_1.downloadBuiltinKeycloakTheme)({
                            keycloakVersion: keycloakVersion,
                            "destDirPath": builtinKeycloakThemeTmpDirPath,
                            buildOptions: buildOptions
                        })];
                case 2:
                    _a.sent();
                    (0, transformCodebase_1.transformCodebase)({
                        "srcDirPath": (0, path_1.join)(builtinKeycloakThemeTmpDirPath, "base", "email"),
                        "destDirPath": emailThemeSrcDirPath
                    });
                    {
                        themePropertyFilePath = (0, path_1.join)(emailThemeSrcDirPath, "theme.properties");
                        fs.writeFileSync(themePropertyFilePath, Buffer.from("parent=base\n".concat(fs.readFileSync(themePropertyFilePath).toString("utf8")), "utf8"));
                    }
                    logger.log("".concat((0, path_1.relative)(process.cwd(), emailThemeSrcDirPath), " ready to be customized, feel free to remove every file you do not customize"));
                    (0, fs_rmSync_1.rmSync)(builtinKeycloakThemeTmpDirPath, { "recursive": true, "force": true });
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
if (require.main === module) {
    main();
}
//# sourceMappingURL=initialize-email-theme.js.map