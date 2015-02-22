'use strict';

var QuickUnionUF;

(function () {
  QuickUnionUF = function(N) {
    this.id = [];
    this.sz = [];
    for (var i = 0; i < N; i++) {
      this.id.push(i);
      this.sz.push(1);
    }
  };

  QuickUnionUF.prototype.root = function(i) {
    while (i != this.id[i]) {
      i = this.id[i];
    }
    return i;
  };

  QuickUnionUF.prototype.find = function(p ,q) {
    return this.root(p) === this.root(q);
  };

  QuickUnionUF.prototype.union = function(p, q) {
    var i = this.root(p);
    var j = this.root(q);
    this.id[j] = i;
  };
})();