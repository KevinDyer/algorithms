(function(undefined) {
  'use strict';

  var DirectedCycle = function(G) {
    this._marked = [];
    this._edgeTo = [];
    this._onStack = [];
    this._cycle = null;

    // Initialize
    for (var i = 0; i < G.V(); i++) {
      this._marked.push(false);
      this._edgeTo.push(-1);
      this._onStack.push(false);
    }

    for (var v = 0; v < G.V(); v++) {
      if (!this._marked[v]) {
        this._dfs(G, v);
      }
    }
  };

  DirectedCycle.prototype._dfs = function(G, v) {
    this._marked[v] = true;
    this._onStack[v] = true;

    var adjv = G.adj(v);
    for (var i = 0; i < adjv.length; i++) {
      var w = adjv[i];

      // short circuit if directed cycle found
      if (this._cycle) {
        return;
      }
      //found new vertex, so recur
      else if (!this._marked[w]) {
        this._edgeTo[w] = v;
        this._dfs(G, w);
      }
      // trace back directed cycle
      else if (this._onStack[w]) {
        this._cycle = [];
        for (var x = v; x !== w; x = this._edgeTo[x]) {
          this._cycle.unshift(x);
        }
        this._cycle.unshift(w);
        this._cycle.unshift(v);
      }
    }

    this._onStack[v] = false;
  };

  DirectedCycle.prototype.hasCycle = function() {
    return (null !== this._cycle);
  };

  DirectedCycle.prototype.cycle = function() {
    return this._cycle;
  };

  module.exports.DirectedCycle = DirectedCycle;
}());