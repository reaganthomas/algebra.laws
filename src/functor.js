(function() {
  var claire = require('claire');
  var forAll = claire.forAll;
  var _      = claire.data;

  /*
    A value that has a Functor must expose a 'map' method.
    The 'map' method takes one argument:

      a.map(f)

    1. 'f' must be a function.
      i.  If 'f' is not a function, the behavior of 'map' is unspecified.
      ii. 'f' can return any value.
    2. 'map' must return a value of the same Functor.
  */

  /*
    1st Law: Identity
      'a.map((b) => b)' is equivalent to 'a'
  */
  function identity(f) {
    return forAll(_.Int).satisfy(function(a) {
      function returnSelf(b) {
        return b;
      }

      return f(a).map(returnSelf).isEqual(f(a));
    });
  }

  /*
    2nd Law: Composition
      'a.map((b) => f(g(b))' is equivalent to 'a.map(f).map(g)'
  */
  function composition(f) {
    return forAll(_.Int).satisfy(function(a) {
      function g(x) { return x * 2; }
      function h(x) { return x - 1; }

      function returnComposition(b) {
        return g(h(b));
      }

      return f(a).map(returnComposition).isEqual(f(a).map(h).map(g));
    });
  }

  module.exports = {
    identity:    identity,
    composition: composition
  };
})();
