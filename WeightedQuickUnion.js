'use strict';

var WeightQuickUnion;

(function () {
  WeightQuickUnion = function(N) {
    this.id = [];
    this.sz = [];
    for (var i = 0; i < N; i++) {
      this.id.push(i);
      this.sz.push(1);
    }
  };

  WeightQuickUnion.prototype.root = function(i) {
    while (i != this.id[i]) {
      i = this.id[i];
    }
    return i;
  };

  WeightQuickUnion.prototype.find = function(p ,q) {
    return this.root(p) === this.root(q);
  };

  WeightQuickUnion.prototype.union = function(p, q) {
    var i = this.root(p);
    var j = this.root(q);
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
  };
})();