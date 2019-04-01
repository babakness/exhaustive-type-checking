type NonDistributiveMatchLeft<A,B,C> = [A] extends [B] ? C : never
type NonDistributiveMatchBoth<A,B,C> = NonDistributiveMatchLeft<A,B,C> & NonDistributiveMatchLeft<B,A,C>
type RecordOfFunctions<Out> = {[ _ in string |number ]: () => Out}
export function match<Out, O extends RecordOfFunctions<Out>, K >( obj: O extends RecordOfFunctions<Out> ? O : O, key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O ): Out 
export function match<Out, O extends RecordOfFunctions<Out> >( obj: O extends RecordOfFunctions<Out> ? O : O ) : <K>( key: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O ) => Out 
export function match<Out, O extends RecordOfFunctions<Out>, K >( obj: O extends RecordOfFunctions<Out> ? O : O, key?: K & NonDistributiveMatchBoth<K, keyof O, K> & keyof O ): ( (key: keyof O) => Out ) | Out {
  if( key === undefined) {
    return ( key: keyof O ) => obj[ key ]()
  } else {
    return obj[ key ]()
  }
}
