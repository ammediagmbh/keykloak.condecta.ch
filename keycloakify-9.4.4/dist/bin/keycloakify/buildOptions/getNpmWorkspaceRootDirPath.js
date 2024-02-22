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
exports.getNpmWorkspaceRootDirPath = void 0;
var child_process = __importStar(require("child_process"));
var path_1 = require("path");
var assert_1 = require("tsafe/assert");
var cache = undefined;
function getNpmWorkspaceRootDirPath(params) {
    var reactAppRootDirPath = params.reactAppRootDirPath;
    use_cache: {
        if (cache === undefined || cache.reactAppRootDirPath !== reactAppRootDirPath) {
            break use_cache;
        }
        var npmWorkspaceRootDirPath_1 = cache.npmWorkspaceRootDirPath;
        return { npmWorkspaceRootDirPath: npmWorkspaceRootDirPath_1 };
    }
    var npmWorkspaceRootDirPath = (function callee(depth) {
        var cwd = (0, path_1.resolve)(path_1.join.apply(void 0, __spreadArray([], __read(__spreadArray([reactAppRootDirPath], __read(Array(depth).fill("..")), false)), false)));
        try {
            child_process.execSync("npm config get", { cwd: cwd });
        }
        catch (error) {
            if (String(error).includes("ENOWORKSPACES")) {
                (0, assert_1.assert)(cwd !== path_1.sep, "NPM workspace not found");
                return callee(depth + 1);
            }
            throw error;
        }
        return cwd;
    })(0);
    cache = {
        reactAppRootDirPath: reactAppRootDirPath,
        npmWorkspaceRootDirPath: npmWorkspaceRootDirPath
    };
    return { npmWorkspaceRootDirPath: npmWorkspaceRootDirPath };
}
exports.getNpmWorkspaceRootDirPath = getNpmWorkspaceRootDirPath;
//# sourceMappingURL=getNpmWorkspaceRootDirPath.js.map