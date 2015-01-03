'use strict';

(function() {
  var UnionFind = function(N) {
    this.id = [];
    for (var i = 0; i < N; i++) {
      this.id.push(i);
    }
  };

  UnionFind.prototype.find = function(p, q) {
    return this.id[p] === this.id[q];
  };
  
  UnionFind.prototype.union = function(p, q) {
    var pid = this.id[p];
    for (var i = 0; i < this.id.length; i++) {
      if (this.id[i] === pid) this.id[i] = this.id[q];
    }
  };
})();