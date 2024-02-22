"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
var getLogger = function (_a) {
    var _b = _a === void 0 ? {} : _a, isSilent = _b.isSilent;
    return {
        log: function (message, _a) {
            var _b = _a === void 0 ? {} : _a, force = _b.force;
            if (isSilent && !force) {
                return;
            }
            console.log(message);
        },
        warn: function (message) {
            console.warn(message);
        },
        error: function (message) {
            console.error(message);
        }
    };
};
exports.getLogger = getLogger;
//# sourceMappingURL=logger.js.map