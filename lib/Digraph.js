(function(undefined) {
  'use strict';

  var Digraph = function(V) {
    if (0 > V) {
      throw new Error('Number of vertices in a Digraph must be nonnegative');
    }
    this._V = V;
    this._E = 0;
    this._adj = [];
    for (var i = 0; i < this._V; i++) {
      this._adj.push([]);
    }
  };

  Digraph.prototype.V = function() {
    return this._V;
  };

  Digraph.prototype.E = function() {
    return this._E;
  };

  Digraph.prototype._validateVertex = function(v) {
    if (0 > v || this._V <= v) {
      throw new Error('vertex ' + v + ' is not between 0 and ' + (this._V-1));
    }
  };

  Digraph.prototype.addEdge = function(v, w) {
    this._validateVertex(v);
    this._validateVertex(w);
    this._adj[v].push(w);
    this._E++;
  };

  Digraph.prototype.adj = function(v) {
    this._validateVertex(v);
    return this._adj[v];
  };

  Digraph.prototype.reverse = function() {
    var R = new Digraph(this._V);
    for (var v = 0; v < this._V; v++) {
      var adjv = this.adj(v);
      for (var i = 0; i < adjv.length; i++) {
        var w = adjv[i];
        R.addEdge(w, v);
      }
    }
    return R;
  };

  Digraph.prototype.print = function() {
    console.log(this._V + ' vertices, ' + this._E + ' edges');
    for (var v = 0; v < this._V; v++) {
      var output = '' + v + ': ';
      var adjv = this.adj(v);
      for (var i = 0; i < adjv.length; i++) {
        var w = adjv[i];
        output += '' + w + ' ';
      }
      console.log(output);
    }
  };

  module.exports.Digraph = Digraph;
}());