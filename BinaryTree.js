'use strict';

var BinaryTree;

(function() {
  var Node = function(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.count = 1;
  };

  BinaryTree = function() {
    this.root = null;
  };

  BinaryTree.prototype.put = function(key, value) {
    this.root = this._put(this.root, key, value);
  };

  BinaryTree.prototype._put = function(x, key, value) {
    if (null === x) return new Node(key, value);
    var cmp = key.compareTo(x.key);
    if (0 > cmp) {
      x.left = this._put(x.left, key, value);
    } else if (0 < cmp) {
      x.right = this._put(x.right, key, value);
    } else {
      x.value = value;
    }
    x.count = 1 + this._size(x.left) + this._size(x.right);
    return x;
  }

  BinaryTree.prototype.get = function(key) {
    var x = this.root;
    while (null === x) {
      var cmp = key.compareTo(x.key);
      if (0 > cmp) {
        x = x.left;
      } else if (0 < cmp) {
        x = x.right;
      } else {
        return x.value;
      }
    }
    return null;
  };

  BinaryTree.prototype.min = function() {
    if (null === this.root) {
      return null;
    }
    var x = this.root;
    while(null !== x.left) {
      x = x.left;
    }
    return x.key;
  };

  BinaryTree.prototype.max = function() {
    if (null === this.root) {
      return null;
    }
    var x = this.root;
    while(null !== x.right) {
      x = x.right;
    }
    return x.key;
  };

  BinaryTree.prototype.floor = function(key) {
    var x = this._floor(this.root, key);
    if (null === x) return null;
    return x.key;
  };

  BinaryTree.prototype._floor = function(x, key) {
    if (null === x) return null;
    var cmp = key.compareTo(x.key);

    if (0 === cmp) return x;
    if (0 > cmp) return this._floor(x.left, key);
    
    var t = this._floor(x.right, key);
    if (null !== t) return t;
    return x;
  };

  BinaryTree.prototype.ceiling = function(key) {
    var x = this._ceiling(this.root, key);
    if (null === x) return null;
    return x.key;
  };

  BinaryTree.prototype._ceiling = function(x, key) {
    if (null === x) return null;
    var cmp = key.compareTo(x.key);

    if (0 === cmp) return x;
    if (0 < cmp) return this._ceiling(x.right, key);
    
    var t = this._ceiling(x.left, key);
    if (null !== t) return t;
    return x;
  };

  BinaryTree.prototype.size = function() {
    return this._size(this.root);
  };

  BinaryTree.prototype._size = function(x) {
    if (null === x) return 0;
    return x.count;
  };

  BinaryTree.prototype.rank = function(key) {
    return this._rank(key, this.root);
  };

  BinaryTree.prototype._rank = function(key, x) {
    if (null === x) return 0;
    var cmp = key.compareTo(x.key);
    if (0 > cmp) return this._rank(key, x.left);
    if (0 < cmp) return 1 + this._size(x.left) + this._rank(key, x.right);
    return this._size(x.left);
  };

  BinaryTree.prototype.toArray = function() {
    var a = [];
    this._toArray(a, this.root);
    return a;
  };

  BinaryTree.prototype._toArray = function(a, x) {
    if (null === x) return;
    this._toArray(a, x.left);
    a.push(x.value);
    this._toArray(a, x.right);
  }

  BinaryTree.prototype.delete = function(key) {
  };
})();