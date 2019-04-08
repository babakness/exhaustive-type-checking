import { match, matchSwitch, matchConfig, MatchRecord, errorMessage } from './index'

let errorCount = 0
let totalTests = 0

const okLog = <T>( x: T): T => (console.log(x),x)
const errLog = <T>( x: T): T => (errorCount++,console.error(x),x)
const staticType = <T>( x: T ): T => x


const test = ( statement: string, truth: boolean ) => (
  totalTests++,
  truth 
    ? okLog(`✅ PASSED: ${statement}`)
    : errLog(`🚫 FAILED: ${statement}`)
)

const catchRuntimeError = ( expectedError: string, statement: string,  wrappedFn: () => unknown  ) => {
  try {
    wrappedFn()
  } catch (e) {
    return test( `RUNTIME ERROR CHECK: ${statement}`, e.message === expectedError )
  }
  return test( `RUNTIME ERROR CHECK: ${statement}`, false )
}

const catchFixedRuntimeError = catchRuntimeError.bind( undefined, errorMessage )

type Fruit = 'banana' | 'date' | 'mango'

const mapFruitToNumber: MatchRecord<Fruit,number> = ({
  banana: () => 1,
  date: () => 2,
  mango: () => 3
})

/**
 * `match` tests
 */

//
const getFruitNumberCurried = match( mapFruitToNumber )
const BADgetFruitNumberCurried = match( undefined as any)

function getFruitNumberCurriedInFunction( fruit: Fruit ) {
  return getFruitNumberCurried( fruit )
}

function getFruitNumber( fruit: Fruit ) {
  return match( mapFruitToNumber, fruit )
}


test('Match uncurried, direct', 
  match(
    mapFruitToNumber, 
    'banana' as Fruit
  ) === 1 
) /*?. $ */

catchFixedRuntimeError('match uncurried direct',
  () => match( mapFruitToNumber, 'BADKEY' as Fruit )
)  /*?. $ */

catchFixedRuntimeError('match uncurried direct 2',
  () => match( BADgetFruitNumberCurried as any, 'BADKEY' as any )
)  /*?. $ */
catchFixedRuntimeError('match curried',
  () => match( BADgetFruitNumberCurried as any)( 'BADKEY' as any )
)  /*?. $ */


test('Match uncurried, via function', 
  staticType<number>( getFruitNumber('banana') ) === 1 
) /*?. $ */

catchFixedRuntimeError('match uncurried',
  () => getFruitNumber('BADKEY' as Fruit) 
)  /*?. $ */

test('Match curried, direct', 
  staticType<number>(getFruitNumberCurried('date' as Fruit)) === 2 
) /*?. $ */

catchFixedRuntimeError('match curried, direct',
  () => getFruitNumberCurried('BADKEY' as Fruit)
)  /*?. $ */

test('Match curried, via function', 
  staticType<number>(getFruitNumberCurriedInFunction('mango' as Fruit)) === 3 
) /*?. $ */

catchFixedRuntimeError('Mtch curried, via function',
  () => getFruitNumberCurriedInFunction('BADKEY' as Fruit)
) /*?. $ */

/**
 * `matchConfig` tests
 */

 //

 const matchFruit = matchConfig<Fruit>()
 // Auto while entering fruit types does work
 const curriedMatchFruit = matchFruit({
   banana: () => 1,
   date: () => 2,
   mango: () => 3
 })

const BADcurriedMatchFruit = matchFruit(undefined as any)


test('matchConfig curried', 
  staticType<number>(curriedMatchFruit('banana')) === 1 
) /*?. $ */

catchFixedRuntimeError('matchConfig curried',
  () => curriedMatchFruit('BADKEY' as Fruit)
) /*?. $ */

catchFixedRuntimeError('matchConfig curried',
  () => BADcurriedMatchFruit('BADKEY' as Fruit)
) /*?. $ */


test('matchConfig direct', 
  staticType<number>(matchFruit(mapFruitToNumber, 'banana')) === 1
) /*?. $ */

catchFixedRuntimeError(' matchConfig, direct',
 () => matchFruit(mapFruitToNumber, 'BADKEY' as Fruit )
) /*?. $ */

catchFixedRuntimeError('matchConfig, direct',
 () => matchFruit(undefined as any, 'BADKEY' as Fruit )
) /*?. $ */

/**
 * `matchSwitch` tests
 */

 //

 test('matchSwitch, direct uncurried', 
  staticType<number>( 
    matchSwitch( 'banana' as Fruit, {
      'banana': () => 1,
      'date': () => 2,
      'mango': () => 3,
    }) 
  ) === 1 
 ) /*?. $ */

catchFixedRuntimeError('matchSwitch, direct uncurried', 
  () => matchSwitch( 'banana' as Fruit, {} as any ) 
) /*?. $ */


const matchSwitchFruit = matchSwitch('banana' as Fruit)

test('matchSwitch, direct curried', 
  staticType<number>(matchSwitchFruit( mapFruitToNumber )) === 1 
) /*?. $ */

catchFixedRuntimeError('matchSwitch, direct curried', 
  () => matchSwitchFruit( undefined as any )
) /*?. $ */

catchFixedRuntimeError('matchSwitch, direct curried 2', 
  () => matchSwitchFruit( {} as any )
) /*?. $ */


console.log( `${ totalTests - errorCount } / ${ totalTests } Passed` )

if(errorCount > 0 && process && process.exit) {
  process.exit(1)
}
