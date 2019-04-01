declare type NonDistributiveMatchLeft<A, B, C> = [A] extends [B] ? C : never;
declare type NonDistributiveMatchBoth<A, B, C> = NonDistributiveMatchLeft<A, B, C> & NonDistributiveMatchLeft<B, A, C>;
declare type RecordOfFunctions<Out> = {
    [_ in string | number]: () => Out;
};
export declare function match<Out, O extends RecordOfFunctions<Out>, K>(obj: O extends RecordOfFunctions<Out> ? O : O, key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O): Out;
export declare function match<Out, O extends RecordOfFunctions<Out>>(obj: O extends RecordOfFunctions<Out> ? O : O): <K>(key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O) => Out;
export {};
