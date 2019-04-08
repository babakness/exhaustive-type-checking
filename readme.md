
<img src="https://raw.githubusercontent.com/babakness/exhaustive-type-checking/master/.github/images/animation.gif" />

This project was inspired by this StackOverflow question:

https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript

I wanted that didn't rely on switch and supported currying. So I cooked this up.

# Overview

This package exposes a helper type and three helper functions. Compare the switch pattern with those offered by this package.

```ts
type Fruit = 'banana' | 'orange' | 'mango' | 'coconut'
export function makeDessert( fruit: Fruit ) {
  switch( fruit ) {
    case 'banana': return 'Banana Shake'
    case 'orange': return 'Orange Juice'
    case 'mango': return 'Mango Smoothie'
    case 'coconut': return 'Coconut Ice Cream'
  }
  exhaustiveCheck( fruit )
}
```

## `matchConfig`

Deals with type limitations in TypeScript to partially assign generics. This is a function factory used to set the type expected by return function. Example use of the factory function:

```ts
const matchFruit = matchConfig<Fruit>()
```

The returned function is curried. It takes an object with lazily evaluated values and keys covering all possibilities for that type. To create the `makeDessert` function above, we would call `matchFruit` as follows:

```ts
const makeDessert = matchFruit({
  'banana': () => 'Banana Shake'
  'orange': () => 'Orange Juice'
  'mango': () => 'Mango Smoothie'
  'coconut': () => 'Coconut Ice Cream'
})
```

with the same exhaustive type checking afforded by the case-switch statement above approach above.

## `match`

Match is like `matchConfig` without the first function call. To make `makeDessert` we could provide the object first

```ts
const makeDessert = match({
  'banana': () => 'Banana Shake'
  'orange': () => 'Orange Juice'
  'mango': () => 'Mango Smoothie'
  'coconut': () => 'Coconut Ice Cream'
})
```

Then pass the variable with needed type information second

```ts
const dessert = makeDessert<Fruit>( 'banana' )
```

Or rely on the incoming variables type

```ts
function example( fruit: Fruit ) {
  const dessert = makeDessert( fruit )
  // ...
}
```

## `matchSwitch`

Designed to be a direct replacement for the `switch` pattern. 

```ts
export function makeDessert( fruit: Fruit ) {
  return matchSwitch( fruit, {
    'banana': () => 'Banana Shake',
    'orange': () => 'Orange Juice',
    'mango': () => 'Mango Smoothie',
    'coconut': () => 'Coconut Ice Cream',
  })
}
```

# Tutorial

See the video tutorial for more details

[![Tutorial on YouTube](https://raw.githubusercontent.com/babakness/exhaustive-type-checking/master/.github/images/video-image-play-overlay.png)](https://www.youtube.com/watch?v=SexXTM70w-M)

