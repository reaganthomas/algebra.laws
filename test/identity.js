// A slightly minified version of the identity structure
// found in the npm package algebra.structures.identity.

(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) { return x.inspect ? x.inspect() : x; }

  var Identity = Constructor(function(value) {
    this.isEmpty = false;
    this.value = value;
  });

  Identity.prototype.empty = function() {
    var id = new Identity();
    id.isEmpty = true;
    return id;
  };

  Identity.prototype.concat = function(b) {
    if(this.isEmpty)   return b;
    else if(b.isEmpty) return this;
    else               return new Identity(this.value.concat(b.value));
  };

  Identity.prototype.map = function(f) { return new Identity(f(this.value)); };

  Identity.prototype.ap = function(b) { return new Identity(this.value(b.value)); };

  Identity.prototype.of = function(a) { return new Identity(a); };

  Identity.prototype.chain = function(f) { return f(this.value); };

  Identity.prototype.inspect = function() { return 'Identity(' + inspect(this.value) + ')'; };

  Identity.prototype.isEqual = function(a) {
    if(this.isEmpty) return a.isEmpty;
    return !a.isEmpty && deepEqual(this.value, a.value);
  };

  module.exports = Identity;
})();
