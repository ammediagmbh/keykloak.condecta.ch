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
exports.main = void 0;
var generateTheme_1 = require("./generateTheme");
var generatePom_1 = require("./generatePom");
var path_1 = require("path");
var child_process = __importStar(require("child_process"));
var generateStartKeycloakTestingContainer_1 = require("./generateStartKeycloakTestingContainer");
var fs = __importStar(require("fs"));
var buildOptions_1 = require("./buildOptions");
var logger_1 = require("../tools/logger");
var getThemeSrcDirPath_1 = require("../getThemeSrcDirPath");
var getThisCodebaseRootDirPath_1 = require("../tools/getThisCodebaseRootDirPath");
var readThisNpmProjectVersion_1 = require("../tools/readThisNpmProjectVersion");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var buildOptions, logger, themeSrcDirPath, _a, _b, themeName, e_1_1, pomFileCode, jarFilePath, jarDirPath, retrocompatJarFilePath, containerKeycloakVersion;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    buildOptions = (0, buildOptions_1.readBuildOptions)({
                        "processArgv": process.argv.slice(2)
                    });
                    logger = (0, logger_1.getLogger)({ "isSilent": buildOptions.isSilent });
                    logger.log("🔏 Building the keycloak theme...⌚");
                    themeSrcDirPath = (0, getThemeSrcDirPath_1.getThemeSrcDirPath)({ "reactAppRootDirPath": buildOptions.reactAppRootDirPath }).themeSrcDirPath;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    _a = __values(buildOptions.themeNames), _b = _a.next();
                    _d.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    themeName = _b.value;
                    return [4 /*yield*/, (0, generateTheme_1.generateTheme)({
                            themeName: themeName,
                            themeSrcDirPath: themeSrcDirPath,
                            "keycloakifySrcDirPath": (0, path_1.join)((0, getThisCodebaseRootDirPath_1.getThisCodebaseRootDirPath)(), "src"),
                            "keycloakifyVersion": (0, readThisNpmProjectVersion_1.readThisNpmProjectVersion)(),
                            buildOptions: buildOptions
                        })];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8:
                    {
                        pomFileCode = (0, generatePom_1.generatePom)({ buildOptions: buildOptions }).pomFileCode;
                        fs.writeFileSync((0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "pom.xml"), Buffer.from(pomFileCode, "utf8"));
                    }
                    jarFilePath = (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, "target", "".concat(buildOptions.artifactId, "-").concat(buildOptions.themeVersion, ".jar"));
                    if (buildOptions.doCreateJar) {
                        child_process.execSync("mvn clean install", { "cwd": buildOptions.keycloakifyBuildDirPath });
                        jarDirPath = (0, path_1.dirname)(jarFilePath);
                        retrocompatJarFilePath = (0, path_1.join)(jarDirPath, "retrocompat-" + (0, path_1.basename)(jarFilePath));
                        fs.renameSync((0, path_1.join)(jarDirPath, "original-" + (0, path_1.basename)(jarFilePath)), retrocompatJarFilePath);
                        fs.writeFileSync((0, path_1.join)(jarDirPath, "README.md"), Buffer.from([
                            "- The ".concat(jarFilePath, " is to be used in Keycloak 23 and up.  "),
                            "- The ".concat(retrocompatJarFilePath, " is to be used in Keycloak 22 and below."),
                            "  Note that Keycloak 22 is only supported for login and email theme but not for account themes.  "
                        ].join("\n"), "utf8"));
                    }
                    containerKeycloakVersion = "23.0.6";
                    (0, generateStartKeycloakTestingContainer_1.generateStartKeycloakTestingContainer)({
                        "keycloakVersion": containerKeycloakVersion,
                        jarFilePath: jarFilePath,
                        buildOptions: buildOptions
                    });
                    fs.writeFileSync((0, path_1.join)(buildOptions.keycloakifyBuildDirPath, ".gitignore"), Buffer.from("*", "utf8"));
                    logger.log(__spreadArray(__spreadArray([
                        ""
                    ], __read((!buildOptions.doCreateJar
                        ? []
                        : [
                            "\u2705 Your keycloak theme has been generated and bundled into .".concat(path_1.sep).concat((0, path_1.relative)(buildOptions.reactAppRootDirPath, jarFilePath), " \uD83D\uDE80")
                        ])), false), [
                        "",
                        "To test your theme locally you can spin up a Keycloak ".concat(containerKeycloakVersion, " container image with the theme pre loaded by running:"),
                        "",
                        "\uD83D\uDC49 $ .".concat(path_1.sep).concat((0, path_1.relative)(buildOptions.reactAppRootDirPath, (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, generateStartKeycloakTestingContainer_1.generateStartKeycloakTestingContainer.basename)), " \uD83D\uDC48"),
                        "",
                        "Once your container is up and running: ",
                        "- Log into the admin console 👉 http://localhost:8080/admin username: admin, password: admin 👈",
                        "- Create a realm:                       Master         -> AddRealm   -> Name: myrealm",
                        "- Enable registration:                  Realm settings -> Login tab  -> User registration: on",
                        "- Enable the Account theme (optional):  Realm settings -> Themes tab -> Account theme: ".concat(buildOptions.themeNames[0]),
                        "                                        Clients        -> account    -> Login theme:   ".concat(buildOptions.themeNames[0]),
                        "- Enable the email theme (optional):    Realm settings -> Themes tab -> Email theme:   ".concat(buildOptions.themeNames[0], " (option will appear only if you have ran npx initialize-email-theme)"),
                        "- Create a client                       Clients        -> Create     -> Client ID:                       myclient",
                        "                                                                        Root URL:                        https://www.keycloak.org/app/",
                        "                                                                        Valid redirect URIs:             https://www.keycloak.org/app* http://localhost* (localhost is optional)",
                        "                                                                        Valid post logout redirect URIs: https://www.keycloak.org/app* http://localhost*",
                        "                                                                        Web origins:                     *",
                        "                                                                        Login Theme:                     ".concat(buildOptions.themeNames[0]),
                        "                                                                        Save (button at the bottom of the page)",
                        "",
                        "- Go to  \uD83D\uDC49  https://www.keycloak.org/app/ \uD83D\uDC48 Click \"Save\" then \"Sign in\". You should see your login page",
                        "- Got to \uD83D\uDC49  http://localhost:8080/realms/myrealm/account \uD83D\uDC48 to see your account theme",
                        "",
                        "Video tutorial: https://youtu.be/WMyGZNHQkjU",
                        ""
                    ], false).join("\n"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=keycloakify.js.map