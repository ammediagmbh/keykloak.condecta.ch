"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReactAppRootDirPath = void 0;
var minimist_1 = __importDefault(require("minimist"));
var getAbsoluteAndInOsFormatPath_1 = require("../../tools/getAbsoluteAndInOsFormatPath");
function getReactAppRootDirPath(params) {
    var processArgv = params.processArgv;
    var argv = (0, minimist_1.default)(processArgv);
    var reactAppRootDirPath = (function () {
        var _a;
        var arg = (_a = argv["project"]) !== null && _a !== void 0 ? _a : argv["p"];
        if (typeof arg !== "string") {
            return process.cwd();
        }
        return (0, getAbsoluteAndInOsFormatPath_1.getAbsoluteAndInOsFormatPath)({
            "pathIsh": arg,
            "cwd": process.cwd()
        });
    })();
    return { reactAppRootDirPath: reactAppRootDirPath };
}
exports.getReactAppRootDirPath = getReactAppRootDirPath;
//# sourceMappingURL=getReactAppRootDirPath.js.map