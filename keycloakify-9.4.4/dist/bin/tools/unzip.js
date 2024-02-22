"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.unzip = void 0;
var promises_1 = __importDefault(require("node:fs/promises"));
var fs_1 = __importDefault(require("fs"));
var node_path_1 = __importDefault(require("node:path"));
var yauzl_1 = __importDefault(require("yauzl"));
var yazl_1 = __importDefault(require("yazl"));
var node_stream_1 = __importDefault(require("node:stream"));
var node_util_1 = require("node:util");
var pipeline = (0, node_util_1.promisify)(node_stream_1.default.pipeline);
function pathExists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, promises_1.default.stat(path)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _a.sent();
                    if (error_1.code === "ENOENT") {
                        return [2 /*return*/, false];
                    }
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Handlings of non posix path is not implemented correctly
// it work by coincidence. Don't have the time to fix but it should be fixed.
function unzip(file, targetFolder, specificDirsToExtract) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            specificDirsToExtract = specificDirsToExtract === null || specificDirsToExtract === void 0 ? void 0 : specificDirsToExtract.map(function (dirPath) {
                if (!dirPath.endsWith("/") || !dirPath.endsWith("\\")) {
                    dirPath += "/";
                }
                return dirPath;
            });
            if (!targetFolder.endsWith("/") || !targetFolder.endsWith("\\")) {
                targetFolder += "/";
            }
            if (!fs_1.default.existsSync(targetFolder)) {
                fs_1.default.mkdirSync(targetFolder, { recursive: true });
            }
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    yauzl_1.default.open(file, { lazyEntries: true }, function (err, zipfile) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            if (err) {
                                reject(err);
                                return [2 /*return*/];
                            }
                            zipfile.readEntry();
                            zipfile.on("entry", function (entry) { return __awaiter(_this, void 0, void 0, function () {
                                var dirPath, target;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (specificDirsToExtract !== undefined) {
                                                dirPath = specificDirsToExtract.find(function (dirPath) { return entry.fileName.startsWith(dirPath); });
                                                // Skip files outside of the unzipSubPath
                                                if (dirPath === undefined) {
                                                    zipfile.readEntry();
                                                    return [2 /*return*/];
                                                }
                                                // Remove the unzipSubPath from the file name
                                                entry.fileName = entry.fileName.substring(dirPath.length);
                                            }
                                            target = node_path_1.default.join(targetFolder, entry.fileName);
                                            if (!/[\/\\]$/.test(target)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, promises_1.default.mkdir(target, { recursive: true })];
                                        case 1:
                                            _a.sent();
                                            zipfile.readEntry();
                                            return [2 /*return*/];
                                        case 2: return [4 /*yield*/, pathExists(target)];
                                        case 3:
                                            // Skip existing files
                                            if (_a.sent()) {
                                                zipfile.readEntry();
                                                return [2 /*return*/];
                                            }
                                            zipfile.openReadStream(entry, function (err, readStream) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (err) {
                                                                reject(err);
                                                                return [2 /*return*/];
                                                            }
                                                            return [4 /*yield*/, promises_1.default.mkdir(node_path_1.default.dirname(target), { "recursive": true })];
                                                        case 1:
                                                            _a.sent();
                                                            return [4 /*yield*/, pipeline(readStream, fs_1.default.createWriteStream(target))];
                                                        case 2:
                                                            _a.sent();
                                                            zipfile.readEntry();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            zipfile.once("end", function () {
                                zipfile.close();
                                resolve();
                            });
                            return [2 /*return*/];
                        });
                    }); });
                })];
        });
    });
}
exports.unzip = unzip;
// NOTE: This code was directly copied from ChatGPT and appears to function as expected.
// However, confidence in its complete accuracy and robustness is limited.
function zip(sourceFolder, targetZip) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    // Recursive function to explore directories and their subdirectories
                    function exploreDir(dir) {
                        return __awaiter(this, void 0, void 0, function () {
                            var dirContent, dirContent_1, dirContent_1_1, file, filePath, stat, e_2_1;
                            var e_2, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, promises_1.default.readdir(dir)];
                                    case 1:
                                        dirContent = _b.sent();
                                        _b.label = 2;
                                    case 2:
                                        _b.trys.push([2, 9, 10, 11]);
                                        dirContent_1 = __values(dirContent), dirContent_1_1 = dirContent_1.next();
                                        _b.label = 3;
                                    case 3:
                                        if (!!dirContent_1_1.done) return [3 /*break*/, 8];
                                        file = dirContent_1_1.value;
                                        filePath = node_path_1.default.join(dir, file);
                                        return [4 /*yield*/, promises_1.default.stat(filePath)];
                                    case 4:
                                        stat = _b.sent();
                                        if (!stat.isDirectory()) return [3 /*break*/, 6];
                                        return [4 /*yield*/, exploreDir(filePath)];
                                    case 5:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 6:
                                        if (stat.isFile()) {
                                            files.push(filePath);
                                        }
                                        _b.label = 7;
                                    case 7:
                                        dirContent_1_1 = dirContent_1.next();
                                        return [3 /*break*/, 3];
                                    case 8: return [3 /*break*/, 11];
                                    case 9:
                                        e_2_1 = _b.sent();
                                        e_2 = { error: e_2_1 };
                                        return [3 /*break*/, 11];
                                    case 10:
                                        try {
                                            if (dirContent_1_1 && !dirContent_1_1.done && (_a = dirContent_1.return)) _a.call(dirContent_1);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                        return [7 /*endfinally*/];
                                    case 11: return [2 /*return*/];
                                }
                            });
                        });
                    }
                    var zipfile, files, files_1, files_1_1, file, relativePath;
                    var e_1, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                zipfile = new yazl_1.default.ZipFile();
                                files = [];
                                // Collecting all files to be zipped
                                return [4 /*yield*/, exploreDir(sourceFolder)];
                            case 1:
                                // Collecting all files to be zipped
                                _b.sent();
                                try {
                                    // Adding files to zip
                                    for (files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                                        file = files_1_1.value;
                                        relativePath = node_path_1.default.relative(sourceFolder, file);
                                        zipfile.addFile(file, relativePath);
                                    }
                                }
                                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                finally {
                                    try {
                                        if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                }
                                zipfile.outputStream
                                    .pipe(fs_1.default.createWriteStream(targetZip))
                                    .on("close", function () { return resolve(); })
                                    .on("error", function (err) { return reject(err); }); // Listen to error events
                                zipfile.end();
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.zip = zip;
//# sourceMappingURL=unzip.js.map