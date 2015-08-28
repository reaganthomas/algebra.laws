(function() {
  var claire = require('claire');
  var forAll = claire.forAll;
  var _      = claire.data;

  /*
    A value that implements the Applicative specification must also
    implement the Functor specification.

    A value which satisfies the specification does not need to implement:
      Functor's 'map', derived as '(f) => this.of(f).ap(this)'

    A value which has an Applicative must expose an 'ap' method.
    The 'ap' method takes one argument:

      a.ap(b)

    1. 'a' must be an Applicative of a function,
      i. If 'a' does not represent a function, the behavior of 'ap' is unspecified.
    2. 'b' must be an Applicative of any value.
    3. 'ap' must apply the function in Applicative 'a' to the value in Applicative 'b'.

    A value which has an Applicative must expose an 'of' method on itself or its 'constructor' object.
    The 'of' method takes one argument:

      a.of(b)
      a.constructor.of(b)

    1. 'of' must provide a value of the same Applicative.
      i. No parts of 'b' should be checked.
  */

  /*
    1st Law: Identity
      'a.of((a) => a).ap(b)' is equivalent to 'b'
  */
  function identity(f) {
    var A = f();

    function returnSelf(b) {
      return b;
    }

    return forAll(_.Int).satisfy(function(a) {
      return A.of(returnSelf).ap(A.of(a)).isEqual(A.of(a));
    });
  }

  /*
    2nd Law: Composition
      'a.of((f) => (g) => (x) => f(g(x))).ap(u).ap(v).ap(w)' is equivalent to 'u.ap(v.ap(w))'
  */
  function composition(f) {
    var A = f();

    return forAll(_.Int).satisfy(function(a) {
      var g = function(x) { return x * 2; };
      var h = function(x) { return x - 1; };

      function compose(f) {
        return function(g) {
          return function(x) {
            return f(g(x));
          };
        };
      }

      var x = A.of(compose).ap(A.of(g)).ap(A.of(h)).ap(A.of(a));
      var y = A.of(g).ap(A.of(h).ap(A.of(a)));

      return x.isEqual(y);
    });
  }

  /*
    3rd Law: Homomorphism
      'a.of(f).ap(a.of(x))' is equivalent to 'a.of(f(x))'
  */
  function homomorphism(f) {
    var A = f();

    return forAll(_.Int).satisfy(function(a) {
      function g(x) { return x * 2; }

      return A.of(g).ap(A.of(a)).isEqual(A.of(g(a)));
    });
  }

  /*
    4th Law: Interchange
      'u.ap(a.of(y))' is equivalent to 'a.of((f) => f(y)).ap(u)'
  */
  function interchange(f) {
    var A = f();

    return forAll(_.Int).satisfy(function(a) {
      function g(x) { return x * 2; }

      function application(f) { return f(a); }

      return A.of(g).ap(A.of(a)).isEqual(A.of(application).ap(A.of(g)));
    });
  }

  module.exports = {
    identity:     identity,
    composition:  composition,
    homomorphism: homomorphism,
    interchange:  interchange
  };
})();
