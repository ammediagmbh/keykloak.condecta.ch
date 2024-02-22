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
exports.rmSync = void 0;
var fs = __importStar(require("fs"));
var path_1 = require("path");
var SemVer_1 = require("./SemVer");
/**
 * Polyfill of fs.rmSync(dirPath, { "recursive": true })
 * For older version of Node
 */
function rmSync(dirPath, options) {
    if (SemVer_1.SemVer.compare(SemVer_1.SemVer.parse(process.version), SemVer_1.SemVer.parse("14.14.0")) > 0) {
        fs.rmSync(dirPath, options);
        return;
    }
    var _a = options.force, force = _a === void 0 ? true : _a;
    if (force && !fs.existsSync(dirPath)) {
        return;
    }
    var removeDir_rec = function (dirPath) {
        return fs.readdirSync(dirPath).forEach(function (basename) {
            var fileOrDirpath = (0, path_1.join)(dirPath, basename);
            if (fs.lstatSync(fileOrDirpath).isDirectory()) {
                removeDir_rec(fileOrDirpath);
                return;
            }
            else {
                fs.unlinkSync(fileOrDirpath);
            }
        });
    };
    removeDir_rec(dirPath);
}
exports.rmSync = rmSync;
//# sourceMappingURL=fs.rmSync.js.map