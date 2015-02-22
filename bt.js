'use strict';

(function() {
  var Node = function(key, value) {
    this.key = key;
    this.value = value;
    this.count = 0;
    this.left = null;
    this.right = null;
  };

  var BinaryTree = function() {
    this.root = null;
  };

  BinaryTree.prototype.put = function(key, value) {
    this.root = this._insert(this.root, key, value);
  };

  BinaryTree.prototype._put = function(x, key, value) {
    if (null === x) {
      return new Node(key, value);
    }
    var cmp = key.compareTo(x.key);
    if (0 > cmp) {
      x.left = this._put(x.left, key, value);
    } else if (0 < cmp) {
      x.right = this._put(x.right, key, value);
    } else {
      x.value = value;
    }
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

  BinaryTree.prototype.size = function() {
    return this._size(this.root);
  }

  BinaryTree.prototype._size = function(x) {
    if (null === x) {
      return 0;
    }
    return x.count;
  }

  BinaryTree.prototype.delete = function(key) {
  };
})();