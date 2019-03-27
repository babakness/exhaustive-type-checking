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

type Literals = 'a' | 'b' | 'c' | 'd'
function mapLiteralToNumber( literals: Literals){
  return literalMatch( literals, {
    'a': () => 1,
    'b': () => 2,
    'c': () => 3,
    'd': () => 4,
  } )
}
