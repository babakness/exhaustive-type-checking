declare type NonDistributiveMatchLeft<A, B, C> = [A] extends [B] ? C : never;
declare type NonDistributiveMatchBoth<A, B, C> = NonDistributiveMatchLeft<A, B, C> & NonDistributiveMatchLeft<B, A, C>;
declare type RecordOfFunctions<Out> = {
    [_ in string | number]: () => Out;
};
export declare const errorMessage = "Object does not have a function at the provided key";
/**
 * A curried function that assists with exhaustive type checking.
 * @param obj - an object with functions for each key. Keys must cover all potential outcomes for `key`
 * @param key - key with a type union cover all keys of `obj`. Function stored at given value will run.
 * @example
 * const makeDessert = match({
 *   'banana': () => 'Banana Shake'
 *   'orange': () => 'Orange Juice'
 *   'mango': () => 'Mango Smoothie'
 *   'coconut': () => 'Coconut Ice Cream'
 * })
 */
export declare function match<Out, O extends RecordOfFunctions<Out>, K>(obj: O extends RecordOfFunctions<Out> ? O : O, key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O): Out;
export declare function match<Out, O extends RecordOfFunctions<Out>>(obj: O extends RecordOfFunctions<Out> ? O : O): <K>(key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O) => Out;
/**
 * An interface for describe an object which has keys matching the given type
 * @example
 * const fruitToDessert: MatchConfig<Fruit> = {
  *   'banana': () => 'Banana Shake'
  *   'orange': () => 'Orange Juice'
  *   'mango': () => 'Mango Smoothie'
  *   'coconut': () => 'Coconut Ice Cream'
  * }
  */
interface MatchConfig<Key extends string | number> {
    <Out>(obj: {
        [k in Key]: () => Out;
    }): (key: Key) => Out;
    <Out>(obj: {
        [k in Key]: () => Out;
    }, key: Key): Out;
}
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
export declare function matchConfig<Key extends string | number>(): MatchConfig<Key>;
/**
 * Provides exhaustive type checking
 * @param key - key with a type union cover all keys of `obj`. Function stored at given value will run.
 * @param obj - an object with functions for each key. Keys must cover all potential outcomes for `key`
 * @example
 * type Fruit = 'banana' | 'orange' | 'mango' | 'coconut'
 * function makeDessert( fruit: Fruit ) {
 *   return matchSwitch( fruit, {
 *     'banana': () => 'Banana Shake'
 *     'orange': () => 'Orange Juice'
 *     'mango': () => 'Mango Smoothie'
 *     'coconut': () => 'Coconut Ice Cream'
 *   }
 * }
 */
export declare function matchSwitch<Out, Key extends string | number = (string | number)>(key: Key, obj: {
    [k in Key]: () => Out;
}): Out;
export declare function matchSwitch<Key extends string | number = (string | number)>(key: Key): <Out>(obj: {
    [k in Key]: () => Out;
}) => Out;
export declare type MatchRecord<Pos extends string, Out> = Record<Pos, () => Out>;
export {};
