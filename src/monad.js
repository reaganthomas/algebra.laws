(function() {
  'use strict';

  var claire = require('claire');
  var forAll = claire.forAll;
  var _      = claire.data;

  /*
    A value that implements the Monad specification must also implement the Applicative and Chain specifications.

    A value that satisfies the specification of a Monad does not need to implement:

      Applicative's 'ap'; derivable as
        '(m) => this.chain((f) => m.map(f))'

      Functor's 'map'; derivable as
        '(f) => m = this, m.chain(a) => m.of(f(a))'
  */

  /*
    1st Law: Left Identity
      'm.of(a).chain(f)' is equivalent to 'f(a)'
  */
  function leftIdentity(f) {
    var M = f();

    return forAll(_.int).satisfy(function(a) {
      var m = M.of(a);

      return m.chain(function(b) {
        return M.of(b);
      }).isEqual(M.of(a));
    });
  }

  /*
    2nd Law: Right Identity
      'm.chain(m.of)' is equivalent to 'm'
  */
  function rightIdentity(f) {
    var M = f();

    return forAll(_.Int).satisfy(function(a) {
      var m = M.of(a);

      return m.chain(M.of).isEqual(m);
    });
  }

  module.exports = {
    leftIdentity:  leftIdentity,
    rightIdentity: rightIdentity
  };
})();
