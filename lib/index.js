"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function match(obj, key) {
    if (key === undefined) {
        return function (key) { return obj[key](); };
    }
    else {
        return obj[key]();
    }
}
exports.match = match;
