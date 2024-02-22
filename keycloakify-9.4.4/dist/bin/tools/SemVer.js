"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemVer = void 0;
var SemVer;
(function (SemVer) {
    var bumpTypes = ["major", "minor", "patch", "rc", "no bump"];
    function parse(versionStr) {
        var match = versionStr.match(/^v?([0-9]+)\.([0-9]+)(?:\.([0-9]+))?(?:-rc.([0-9]+))?$/);
        if (!match) {
            throw new Error("".concat(versionStr, " is not a valid semantic version"));
        }
        var semVer = __assign({ "major": parseInt(match[1]), "minor": parseInt(match[2]), "patch": (function () {
                var str = match[3];
                return str === undefined ? 0 : parseInt(str);
            })() }, (function () {
            var str = match[4];
            return str === undefined ? {} : { "rc": parseInt(str) };
        })());
        var initialStr = stringify(semVer);
        Object.defineProperty(semVer, "parsedFrom", {
            "enumerable": true,
            "get": function () {
                var currentStr = stringify(this);
                if (currentStr !== initialStr) {
                    throw new Error("SemVer.parsedFrom can't be read anymore, the version have been modified from ".concat(initialStr, " to ").concat(currentStr));
                }
                return versionStr;
            }
        });
        return semVer;
    }
    SemVer.parse = parse;
    function stringify(v) {
        return "".concat(v.major, ".").concat(v.minor, ".").concat(v.patch).concat(v.rc === undefined ? "" : "-rc.".concat(v.rc));
    }
    SemVer.stringify = stringify;
    /**
     *
     * v1  <  v2  => -1
     * v1 === v2  => 0
     * v1  >  v2  => 1
     *
     */
    function compare(v1, v2) {
        var e_1, _a;
        var sign = function (diff) { return (diff === 0 ? 0 : diff < 0 ? -1 : 1); };
        var noUndefined = function (n) { return n !== null && n !== void 0 ? n : Infinity; };
        try {
            for (var _b = __values(["major", "minor", "patch", "rc"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var level = _c.value;
                if (noUndefined(v1[level]) !== noUndefined(v2[level])) {
                    return sign(noUndefined(v1[level]) - noUndefined(v2[level]));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return 0;
    }
    SemVer.compare = compare;
    /*
    console.log(compare(parse("3.0.0-rc.3"), parse("3.0.0")) === -1 )
    console.log(compare(parse("3.0.0-rc.3"), parse("3.0.0-rc.4")) === -1 )
    console.log(compare(parse("3.0.0-rc.3"), parse("4.0.0")) === -1 )
    */
    function bumpType(params) {
        var e_2, _a;
        var versionAhead = typeof params.versionAhead === "string" ? parse(params.versionAhead) : params.versionAhead;
        var versionBehind = typeof params.versionBehind === "string" ? parse(params.versionBehind) : params.versionBehind;
        if (compare(versionBehind, versionAhead) === 1) {
            throw new Error("Version regression ".concat(stringify(versionBehind), " -> ").concat(stringify(versionAhead)));
        }
        try {
            for (var _b = __values(["major", "minor", "patch", "rc"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var level = _c.value;
                if (versionBehind[level] !== versionAhead[level]) {
                    return level;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return "no bump";
    }
    SemVer.bumpType = bumpType;
})(SemVer = exports.SemVer || (exports.SemVer = {}));
//# sourceMappingURL=SemVer.js.map