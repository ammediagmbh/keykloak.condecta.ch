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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readParsedPackageJson = void 0;
var fs = __importStar(require("fs"));
var tsafe_1 = require("tsafe");
var zod_1 = require("zod");
var path_1 = require("path");
var zParsedPackageJson = zod_1.z.object({
    "name": zod_1.z.string(),
    "version": zod_1.z.string().optional(),
    "homepage": zod_1.z.string().optional(),
    "keycloakify": zod_1.z
        .object({
        "extraThemeProperties": zod_1.z.array(zod_1.z.string()).optional(),
        "artifactId": zod_1.z.string().optional(),
        "groupId": zod_1.z.string().optional(),
        "doCreateJar": zod_1.z.boolean().optional(),
        "loginThemeResourcesFromKeycloakVersion": zod_1.z.string().optional(),
        "reactAppBuildDirPath": zod_1.z.string().optional(),
        "keycloakifyBuildDirPath": zod_1.z.string().optional(),
        "themeName": zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]).optional(),
        "doBuildRetrocompatAccountTheme": zod_1.z.boolean().optional()
    })
        .optional()
});
(0, tsafe_1.assert)();
var parsedPackageJson;
function readParsedPackageJson(params) {
    var reactAppRootDirPath = params.reactAppRootDirPath;
    if (parsedPackageJson) {
        return parsedPackageJson;
    }
    parsedPackageJson = zParsedPackageJson.parse(JSON.parse(fs.readFileSync((0, path_1.join)(reactAppRootDirPath, "package.json")).toString("utf8")));
    return parsedPackageJson;
}
exports.readParsedPackageJson = readParsedPackageJson;
//# sourceMappingURL=parsedPackageJson.js.map