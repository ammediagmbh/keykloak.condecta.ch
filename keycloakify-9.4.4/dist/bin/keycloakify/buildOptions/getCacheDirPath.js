"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCacheDirPath = void 0;
var path_1 = require("path");
var getAbsoluteAndInOsFormatPath_1 = require("../../tools/getAbsoluteAndInOsFormatPath");
var getNpmWorkspaceRootDirPath_1 = require("./getNpmWorkspaceRootDirPath");
function getCacheDirPath(params) {
    var reactAppRootDirPath = params.reactAppRootDirPath;
    var npmWorkspaceRootDirPath = (0, getNpmWorkspaceRootDirPath_1.getNpmWorkspaceRootDirPath)({ reactAppRootDirPath: reactAppRootDirPath }).npmWorkspaceRootDirPath;
    var cacheDirPath = (0, path_1.join)((function () {
        if (process.env.XDG_CACHE_HOME !== undefined) {
            return (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
                "pathIsh": process.env.XDG_CACHE_HOME,
                "cwd": reactAppRootDirPath
            });
        }
        return (0, path_1.join)(npmWorkspaceRootDirPath, "node_modules", ".cache");
    })(), "keycloakify");
    return { cacheDirPath: cacheDirPath };
}
exports.getCacheDirPath = getCacheDirPath;
//# sourceMappingURL=getCacheDirPath.js.map