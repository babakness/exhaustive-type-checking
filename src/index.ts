// Exhaustive Literal Type Checking
export function run< T, Obj, Key extends keyof Obj >( 
  obj: Obj & {[key: string]: () => T }, 
  key: Key 
): T {
  return obj[ key ]()
}

export type Behavior< Pos extends string , Out > = Record< Pos, () => Out >

function literalMatch< Out, Key extends string | number = ( string | number ) >(
  key: Key,
  obj: {[k in Key]: () => Out } 
): Out {
  return obj[ key ]()
}

