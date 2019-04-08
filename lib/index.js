"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = "Object does not have a function at the provided key";
function match(obj, key) {
    if (key === undefined) {
        return function (key) {
            if (obj != null && typeof obj[key] === 'function') {
                return obj[key]();
            }
            else {
                throw new Error(exports.errorMessage);
            }
        };
    }
    else if (obj && typeof obj[key] === 'function') {
        return obj[key]();
    }
    else {
        throw new Error(exports.errorMessage);
    }
}
exports.match = match;
/**
 * A function with a workaround for current TypeScript limitations.
 * The first function call is only to configure the union type
 * covered by all the keys of `obj`. Returns  curried function
 * that assists with exhaustive type checking.
 * @param obj - an object with functions for each key. Keys must cover all potential outcomes for `key`
 * @param key - key with a type union cover all keys of `obj`. Function stored at given value will run.
 * @example
 * const matchFruit = matchConfig<Fruit>()
 * const makeDessert = matchFruit({
  *   'banana': () => 'Banana Shake'
  *   'orange': () => 'Orange Juice'
  *   'mango': () => 'Mango Smoothie'
  *   'coconut': () => 'Coconut Ice Cream'
  * })
  */
function matchConfig() {
    return function (obj, key) {
        if (key === undefined) {
            return function (key) {
                if (obj != null && typeof obj[key] === 'function') {
                    return obj[key]();
                }
                else {
                    throw new Error(exports.errorMessage);
                }
            };
        }
        else if (obj != null && typeof obj[key] === 'function') {
            return obj[key]();
        }
        else {
            throw new Error(exports.errorMessage);
        }
    };
}
exports.matchConfig = matchConfig;
function matchSwitch(key, obj) {
    if (obj != null && typeof obj[key] === 'function') {
        return obj[key]();
    }
    else if (obj != null && key) {
        throw new Error(exports.errorMessage);
    }
    else {
        return function (obj) {
            if (obj != null && typeof obj[key] === 'function') {
                return obj[key]();
            }
            else {
                throw new Error(exports.errorMessage);
            }
        };
    }
}
exports.matchSwitch = matchSwitch;
// export function run< T, Obj, Key extends keyof Obj >( 
//   obj: Obj & {[key: string]: () => T }, 
//   key: Key 
// ): T {
//   return obj[ key ]()
// }
