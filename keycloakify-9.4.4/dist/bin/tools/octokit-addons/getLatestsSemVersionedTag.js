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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestsSemVersionedTagFactory = void 0;
var listTags_1 = require("./listTags");
var SemVer_1 = require("../SemVer");
function getLatestsSemVersionedTagFactory(params) {
    var octokit = params.octokit;
    function getLatestsSemVersionedTag(params) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var owner, repo, count, semVersionedTags, listTags, _d, _e, _f, tag, version, e_1_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        owner = params.owner, repo = params.repo, count = params.count;
                        semVersionedTags = [];
                        listTags = (0, listTags_1.listTagsFactory)({ octokit: octokit }).listTags;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _d = true, _e = __asyncValues(listTags({ owner: owner, repo: repo }));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _e.next()];
                    case 3:
                        if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 5];
                        _c = _f.value;
                        _d = false;
                        try {
                            tag = _c;
                            version = void 0;
                            try {
                                version = SemVer_1.SemVer.parse(tag.replace(/^[vV]?/, ""));
                            }
                            catch (_h) {
                                return [3 /*break*/, 4];
                            }
                            if (version.rc !== undefined) {
                                return [3 /*break*/, 4];
                            }
                            semVersionedTags.push({ tag: tag, version: version });
                        }
                        finally {
                            _d = true;
                        }
                        _g.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _g.trys.push([7, , 10, 11]);
                        if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _b.call(_e)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, semVersionedTags.sort(function (_a, _b) {
                            var vX = _a.version;
                            var vY = _b.version;
                            return SemVer_1.SemVer.compare(vY, vX);
                        }).slice(0, count)];
                }
            });
        });
    }
    return { getLatestsSemVersionedTag: getLatestsSemVersionedTag };
}
exports.getLatestsSemVersionedTagFactory = getLatestsSemVersionedTagFactory;
//# sourceMappingURL=getLatestsSemVersionedTag.js.map