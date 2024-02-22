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
exports.readResolvedViteConfig = void 0;
var fs = __importStar(require("fs"));
var tsafe_1 = require("tsafe");
var zod_1 = require("zod");
var path_1 = require("path");
var constants_1 = require("../../constants");
var zResolvedViteConfig = zod_1.z.object({
    "buildDir": zod_1.z.string(),
    "publicDir": zod_1.z.string(),
    "assetsDir": zod_1.z.string(),
    "urlPathname": zod_1.z.string().optional()
});
{
    (0, tsafe_1.assert)();
}
function readResolvedViteConfig(params) {
    var cacheDirPath = params.cacheDirPath;
    var resolvedViteConfigJsonFilePath = (0, path_1.join)(cacheDirPath, constants_1.resolvedViteConfigJsonBasename);
    if (!fs.existsSync(resolvedViteConfigJsonFilePath)) {
        return { "resolvedViteConfig": undefined };
    }
    var resolvedViteConfig = (function () {
        if (!fs.existsSync(resolvedViteConfigJsonFilePath)) {
            throw new Error("Missing Keycloakify Vite plugin output.");
        }
        var out;
        try {
            out = JSON.parse(fs.readFileSync(resolvedViteConfigJsonFilePath).toString("utf8"));
        }
        catch (_a) {
            throw new Error("The output of the Keycloakify Vite plugin is not a valid JSON.");
        }
        try {
            var zodParseReturn = zResolvedViteConfig.parse(out);
            // So that objectKeys from tsafe return the expected result no matter what.
            Object.keys(zodParseReturn)
                .filter(function (key) { return !(key in out); })
                .forEach(function (key) {
                delete out[key];
            });
        }
        catch (_b) {
            throw new Error("The output of the Keycloakify Vite plugin do not match the expected schema.");
        }
        return out;
    })();
    return { resolvedViteConfig: resolvedViteConfig };
}
exports.readResolvedViteConfig = readResolvedViteConfig;
//# sourceMappingURL=resolvedViteConfig.js.map