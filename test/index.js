(function() {
  'use strict';

  var Identity = require('algebra.structures.identity');
  var laws = require('../lib');

  function makeId(a)    { return new Identity(a); }
  function makeNelId(a) { return new Identity([a]); }

  describe('Algebraic Laws', function() {
    describe('Semigroup', function() {
      it('1. Associativity', function() { laws.semigroup.associativity(makeNelId).asTest()(); });
    });

    describe('Monoid', function() {
      it('1. Right Identity', function() { laws.monoid.rightIdentity(makeId).asTest()(); });
      it('2. Left Identity',  function() { laws.monoid.leftIdentity(makeId).asTest()(); });
    });

    describe('Functor', function() {
      it('1. Identity',    function() { laws.functor.identity(makeId).asTest()(); });
      it('2. Composition', function() { laws.functor.composition(makeId).asTest()(); });
    });

    describe('Applicative', function() {
      it('1. Identity',     function() { laws.applicative.identity(makeId).asTest()(); });
      it('2. Composition',  function() { laws.applicative.composition(makeId).asTest()(); });
      it('3. Homomorphism', function() { laws.applicative.homomorphism(makeId).asTest()(); });
      it('4. Interchange',  function() { laws.applicative.interchange(makeId).asTest()(); });
    });

    describe('Chain', function() {
      it('1. Associativity', function() { laws.chain.associativity(makeId).asTest()(); });
    });

    describe('Monad', function() {
      it('1. Left Identity',  function() { laws.monad.leftIdentity(makeId).asTest()(); });
      it('2. Right Identity', function() { laws.monad.rightIdentity(makeId).asTest()(); });
    });
  });
})();
