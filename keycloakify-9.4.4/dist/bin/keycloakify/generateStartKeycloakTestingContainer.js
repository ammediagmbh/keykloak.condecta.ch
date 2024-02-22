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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStartKeycloakTestingContainer = void 0;
var fs = __importStar(require("fs"));
var path_1 = require("path");
var assert_1 = require("tsafe/assert");
var Reflect_1 = require("tsafe/Reflect");
{
    var buildOptions = (0, Reflect_1.Reflect)();
    (0, assert_1.assert)();
}
generateStartKeycloakTestingContainer.basename = "start_keycloak_testing_container.sh";
var containerName = "keycloak-testing-container";
/** Files for being able to run a hot reload keycloak container */
function generateStartKeycloakTestingContainer(params) {
    var jarFilePath = params.jarFilePath, keycloakVersion = params.keycloakVersion, buildOptions = params.buildOptions;
    var themeRelativeDirPath = (0, path_1.join)("src", "main", "resources", "theme");
    var themeDirPath = (0, path_1.join)(buildOptions.keycloakifyBuildDirPath, themeRelativeDirPath);
    fs.writeFileSync((0, path_1.join)(buildOptions.keycloakifyBuildDirPath, generateStartKeycloakTestingContainer.basename), Buffer.from(__spreadArray(__spreadArray([
        "#!/usr/bin/env bash",
        "",
        "docker rm ".concat(containerName, " || true"),
        "",
        "cd \"".concat(buildOptions.keycloakifyBuildDirPath, "\""),
        "",
        "docker run \\",
        "   -p 8080:8080 \\",
        "   --name ".concat(containerName, " \\"),
        "   -e KEYCLOAK_ADMIN=admin \\",
        "   -e KEYCLOAK_ADMIN_PASSWORD=admin \\",
        "   -v \"".concat((0, path_1.join)("$(pwd)", (0, path_1.relative)(buildOptions.keycloakifyBuildDirPath, jarFilePath)), "\":\"/opt/keycloak/providers/").concat((0, path_1.basename)(jarFilePath), "\" \\")
    ], __read(fs
        .readdirSync(themeDirPath)
        .filter(function (name) { return fs.lstatSync((0, path_1.join)(themeDirPath, name)).isDirectory(); })
        .map(function (themeName) {
        return "   -v \"".concat((0, path_1.join)("$(pwd)", themeRelativeDirPath, themeName).replace(/\\/g, "/"), "\":\"/opt/keycloak/themes/").concat(themeName, "\":rw \\");
    })), false), [
        "   -it quay.io/keycloak/keycloak:".concat(keycloakVersion, " \\"),
        "   start-dev --features=declarative-user-profile",
        ""
    ], false).join("\n"), "utf8"), { "mode": 493 });
}
exports.generateStartKeycloakTestingContainer = generateStartKeycloakTestingContainer;
//# sourceMappingURL=generateStartKeycloakTestingContainer.js.map