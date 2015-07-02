(function(undefined) {
  'use strict';

  var Topological = function(G) {
    var finder = new DirectedCycle(G);
    if (!finder.hasCycle()) {
      var dfs = new DepthFirstOrder(G);
      this._order = dfs.reversePost();
    }
  };

  Topological.prototype.hasOrder = function() {
    return (null !== this._order);
  };

  Topological.prototype.order = function() {
    return this._order;
  };

  module.exports.Topological = Topological;
}());