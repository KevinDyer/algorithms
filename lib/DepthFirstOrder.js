(function(undefined) {
  'use strict';

  var DepthFirstOrder = function(G) {
    this._marked = [];
    this._pre = [];
    this._post = [];
    this._preorder = [];
    this._postorder = [];
    this._preCounter = 0;
    this._postCounter = 0;

    // Initialize
    for (var i = 0; i < G.V(); i++) {
      this._marked.push(false);
      this._pre.push(-1);
      this._post.push(-1);
    }

    for (var v = 0; v < G.V(); v++) {
      if (!this._marked[v]) {
        this._dfs(G, v);
      }
    }
  };

  DepthFirstOrder.prototype._dfs = function(G, v) {
    this._marked[v] = true;
    this._pre[v] = this._preCounter++;
    this._preorder.push(v);
    var adjv = G.adj(v);
    for (var i = 0; i < adjv.length; i++) {
      var w = adjv[i];
      if (!this._marked[w]) {
        this._dfs(G, w);
      }
    }
    this._postorder.push(v);
    this._post[v] = this._postCounter++;
  };

  DepthFirstOrder.prototype.pre = function() {
    return this._preorder;
  };

  DepthFirstOrder.prototype.post = function() {
    return this._postorder;
  };

  DepthFirstOrder.prototype.reversePost = function() {
    var reverse = [];
    for (var i = 0; i < this._postorder.length; i++) {
      var v = this._postorder[i];
      reverse.unshift(v);
    }
    return reverse;
  };

  module.exports.DepthFirstOrder = DepthFirstOrder;
}());