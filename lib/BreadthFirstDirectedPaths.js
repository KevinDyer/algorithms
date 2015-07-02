(function(undefined) {
  'use strict';

  BreadthFirstDirectedPaths.prototype._bfs = function(G, s) {
    var q = [];
    this._distTo[s] = 0;
    this._marked[s] = true;
    q.push(s);
    while (0 < q.length) {
      var v = q.shift();
      var adjv = G.adj(v);
      for (var i = 0; i < adjv.length; i++) {
        var w = adjv[i];
        if (!this._marked[w]) {
          this._edgeTo[w] = v;
          this._distTo[w] = this._distTo[v] + 1;
          this._marked[w] = true;
          q.push(w);
        }
      }
    }
  };

  BreadthFirstDirectedPaths.prototype.hasPathTo = function(v) {
    return this._marked[v];
  };

  BreadthFirstDirectedPaths.prototype.distTo = function(v) {
    return this._distTo[v];
  };

  BreadthFirstDirectedPaths.prototype.pathTo = function(v) {
    if (!this.hasPathTo(v)) {
      return null;
    }
    var path = [];
    var x;
    for (x = v; this._distTo[x] !== 0; x = this._edgeTo[x]) {
      path.unshift(x);
    }
    return path;
  };

  module.exports.BreadthFirstDirectedPaths = BreadthFirstDirectedPaths;
}());