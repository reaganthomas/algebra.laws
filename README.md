# algebra.laws

Validates algebraic structures' laws. Laws conform to the [Fantasy Land][] specification.

[Fantasy Land]: https://github.com/fantasyland/fantasy-land

## Example

(Coming soon)

## Installing

You can get this package from npm. If you're in a browser environment you can use [Browserify][].

        $ npm install <tbd>

[Browserify]: http://browserify.org/

### CommonJS

(Coming soon)

### Using with AMD

(Coming soon)

### Using without modules

(Coming soon)

### From Source

If you want to work with this libraries source you'll need [Git][] and [Node.js][], and to run these commands:

        $ git clone git://github.com/reaganthomas/algebra.laws.git
        $ cd algebra.laws
        $ npm install
        <tbd>

This will generate the distributable version of this library, `dist/<pathToFile>`, which you can load in any JavaScript environment.

[Git]: http://git-scm.com/
[Node.js]: http://nodejs.org/

## Getting Started

This library provides laws for verifying the correctness of an algebraic structure according to the [Fantasy Land][] specification. This is done by generating random inputs and checking that the algebraic laws hold true for the given structure.

To use these laws your algebraic structures must implement the `isEqual` function:

```js
var Identity = {
  // ...
  isEqual: function(b) {
    if(this.isEmpty && b.isEmpty) return true;
    return (!this.isEmpty && this.value === b.value);
  }
  // ...
}
```

### Laws

  * Applicatives
    1. Identity
    2. Composition
    3. Homomorphism
    4. Interchange
  * Chains
    1. Associativity
  * Functors
    1. Identity
    2. Composition
  * Monads
    1. Left Identity
    2. Right Identity
  * Monoids
    1. Left Identity
    2. Right Identity
  * Semigroups
    1. Associativity

### Using the Laws

To verify a data structure correctly adheres to its algebraic laws you need only pass in a function that constructs said structure holding a single value.

For example, if you have an `Identity` structure and want to verify that it adheres to the Semigroup's law of associativity:

```js
function makeIdentity(a) {
  return new Identity(a);
}

laws.semigroup.associativity(makeIdentity).asTest({ verbose: true })();
// + OK passed 100 tests
```

Note: applying the law to a constructor function gives you back a [Claire][] property. There are different ways to use this object, but the easiest is to use the `asTest(configuration)` method to return a test function. When invoked (with no parameters) this test function will repeatedly generate random inputs to test your implementation against the law.

If any of the inputs results in your structure failing a law an error is thrown with information about why the structure failed. You can control the amount of detail shown and the number of tests performed by passing a configuration object to the `asTest` method. By default the reports are concise and 100 random tests are performed.

```hs
class Configuration where
  verbose :: Bool -- * whether to output a detailed report
  times   :: Int  -- * number of random tests to perform
```

Note: if `verbose` is false no message will be printed by default.

## Platform Support

This library assumes an ECMAScript5 environment, but can be supported in ECMAScript3 and up by the use of the [es5-shim][].

[es5-shim]: https://github.com/kriskowal/es5-shim

## License

Copyright (c) 2015 Reagan Thomas.

Released under the [MIT license](https://gihub.com/reaganthomas/algebra.laws/blob/master/LICENSE)
