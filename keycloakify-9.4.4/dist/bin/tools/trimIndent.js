"use strict";
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
/**
 * Concatenate the string fragments and interpolated values
 * to get a single string.
 */
function populateTemplate(strings) {
    var _a, _b;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var chunks = [];
    for (var i = 0; i < strings.length; i++) {
        var lastStringLineLength = 0;
        if (strings[i]) {
            chunks.push(strings[i]);
            // remember last indent of the string portion
            lastStringLineLength = (_b = (_a = strings[i].split("\n").slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        }
        if (args[i]) {
            // if the interpolation value has newlines, indent the interpolation values
            // using the last known string indent
            var chunk = String(args[i]).replace(/([\r?\n])/g, "$1" + " ".repeat(lastStringLineLength));
            chunks.push(chunk);
        }
    }
    return chunks.join("");
}
/**
 * Shift all lines left by the *smallest* indentation level,
 * and remove initial newline and all trailing spaces.
 */
function trimIndent(strings) {
    var _a, _b, _c;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // Remove initial and final newlines
    var string = populateTemplate.apply(void 0, __spreadArray([strings], __read(args), false)).replace(/^[\r\n]/, "")
        .replace(/\r?\n *$/, "");
    var dents = (_c = (_b = (_a = string
        .match(/^([ \t])+/gm)) === null || _a === void 0 ? void 0 : _a.filter(function (s) { return /^\s+$/.test(s); })) === null || _b === void 0 ? void 0 : _b.map(function (s) { return s.length; })) !== null && _c !== void 0 ? _c : [];
    // No dents? no change required
    if (!dents || dents.length == 0)
        return string;
    var minDent = Math.min.apply(Math, __spreadArray([], __read(dents), false));
    // The min indentation is 0, no change needed
    if (!minDent)
        return string;
    var re = new RegExp("^".concat(" ".repeat(minDent)), "gm");
    var dedented = string.replace(re, "");
    return dedented;
}
exports.default = trimIndent;
//# sourceMappingURL=trimIndent.js.map