(function() {
  'use strict';

  var claire = require('claire');
  var forAll = claire.forAll;
  var _      = claire.data;

  /*
    A value which has a Chain must expose a 'chain' method.
    The 'chain' method takes one argument:

      m.chain(f)

    1. 'f' must be a function which returns a value
      i.  If 'f' is not a function, the behavior of 'chain' is unspecified.
      ii. 'f' must return a value of the same Chain.
    2. 'chain' must return a value of the same Chain.
  */

  /*
    1st Law: Associativity
      'm.chain(f).chain(g)' is equivalent to 'm.chain((x) => f(x).chain(g))'
  */
  function associativity(f) {
    return forAll(_.int).satisfy(function(a) {
      function g(a) { return f(a * 2); }
      function h(a) { return f(a - 1); }

      return f(a).chain(g).chain(h).isEqual(f(a).chain(function(x) {
        return g(x).chain(h);
      }));
    });
  }

  module.exports = {
    associativity: associativity
  };
})();
