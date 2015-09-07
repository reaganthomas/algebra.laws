(function() {
  'use strict';

  module.exports = {
    semigroup:   require('./semigroup'),
    monoid:      require('./monoid'),
    functor:     require('./functor'),
    applicative: require('./applicative'),
    chain:       require('./chain'),
    monad:       require('./monad')
  };
})();
