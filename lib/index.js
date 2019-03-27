"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exhaustive Literal Type Checking
function run(obj, key) {
    return obj[key]();
}
exports.run = run;
function literalMatch(key, obj) {
    return obj[key]();
}
function mapLiteralToNumber(literals) {
    return literalMatch(literals, {
        'a': function () { return 1; },
        'b': function () { return 2; },
        'c': function () { return 3; },
        'd': function () { return 4; },
    });
}
