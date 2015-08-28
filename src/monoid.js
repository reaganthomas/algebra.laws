(function() {
  'use strict';

  var claire = require('claire');
  var forAll = claire.forAll;
  var _      = claire.data;

  /*
    A value that implements the Monoid specification must also implement
    the Semigroup specification.

    A value which has a Monoid must expose an 'empty' method on itself
    or its 'constructor' object. The 'empty' method takes no arguments:

      a.empty()
      a.constructor.empty()

    1. 'empty' must return a value of the same Monoid.
  */

  /*
    1st Law: Right-Identity
      'a.concat(a.empty())' is equivalent to 'a'
  */
  function rightIdentity(f) {
    return forAll(_.Int).satisfy(function(a) {
      var b = f(a);

      return b.concat(b.empty()).isEqual(b);
    });
  }

  /*
    2nd Law: Left-Identity
      'a.empty().concat(a)' is equivalent to 'a'
  */
  function leftIdentity(f) {
    return forAll(_.Int).satisfy(function(a) {
      var b = f(a);

      return b.empty().concat(b).isEqual(b);
    });
  }

  module.exports = {
    rightIdentity: rightIdentity,
    leftIdentity:  leftIdentity
  };
})();
