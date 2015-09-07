(function() {
  var claire = require('claire');
  var forAll = claire.forAll;
  var _      = claire.data;

  /*
    A value which has a Semigroup must expose a 'concat' method.
    The 'concat' method takes one argument:

      a.concat(b)

    1. 'b' must be a value of the same Semigroup.
      i. If 'b' is not of the same Semigroup, 'concat' behavior is unspecified.
    2. 'concat' must return a value of the same Semigroup.
  */

  /*
    1st Law: Associativity
      'a.concat(b).concat(c)' is equivalent to 'a.concat(b.concat(c))'.
  */
  function associativity(f) {
    return forAll(_.Int, _.Int, _.Int).satisfy(function(a, b, c) {
      var x = f(a).concat(f(b)).concat(f(c));
      var y = f(a).concat(f(b).concat(f(c)));

      return x.isEqual(y);
    });
  }

  module.exports = {
    associativity: associativity
  };
})();
