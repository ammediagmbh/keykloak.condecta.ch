"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
function tee(input) {
    var a = new stream_1.PassThrough();
    var b = new stream_1.PassThrough();
    var aFull = false;
    var bFull = false;
    a.setMaxListeners(Infinity);
    a.on("drain", function () {
        aFull = false;
        if (!aFull && !bFull)
            input.resume();
    });
    b.on("drain", function () {
        bFull = false;
        if (!aFull && !bFull)
            input.resume();
    });
    input.on("error", function (e) {
        a.emit("error", e);
        b.emit("error", e);
    });
    input.on("data", function (chunk) {
        aFull = !a.write(chunk);
        bFull = !b.write(chunk);
        if (aFull || bFull)
            input.pause();
    });
    input.on("end", function () {
        a.end();
        b.end();
    });
    return [a, b];
}
exports.default = tee;
//# sourceMappingURL=tee.js.map