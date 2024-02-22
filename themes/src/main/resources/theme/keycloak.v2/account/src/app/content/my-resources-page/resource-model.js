"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scope = void 0;
var Scope = /** @class */ (function () {
    function Scope(name, displayName) {
        this.name = name;
        this.displayName = displayName;
    }
    Scope.prototype.toString = function () {
        if (this.hasOwnProperty('displayName') && (this.displayName)) {
            return this.displayName;
        }
        else {
            return this.name;
        }
    };
    return Scope;
}());
exports.Scope = Scope;
