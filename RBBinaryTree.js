'use strict';

var RBBinaryTree;

(function() {
  var BLACK = false;
  var RED = true;

  var Node = function(key, value, color) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.count = 1;
    this.color = color;
  };

  RBBinaryTree = function() {
    this.root = null;
  };

  RBBinaryTree.prototype.put = function(key, value) {
    this.root = this._put(this.root, key, value);
  };

  RBBinaryTree.prototype._put = function(h, key, value) {
    if (null === h) return new Node(key, value, RED);
    var cmp = key.compareTo(h.key);
    if (0 > cmp) {
      h.left = this._put(h.left, key, value);
    } else if (0 < cmp) {
      h.right = this._put(h.right, key, value);
    } else {
      h.value = value;
    }
    h.count = 1 + this._size(h.left) + this._size(h.right);

    if (this._isRed(h.right) && !this._isRed(h.left)) h = this._rotateLeft(h);
    if (this._isRed(h.left) && this._isRed(h.left.left)) h = this._rotateRight(h);
    if (this._isRed(h.left) && this._isRed(h.right)) this._flipColors(h);

    return h;
  }

  RBBinaryTree.prototype.get = function(key) {
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

  RBBinaryTree.prototype.min = function() {
    if (null === this.root) {
      return null;
    }
    var x = this.root;
    while(null !== x.left) {
      x = x.left;
    }
    return x.key;
  };

  RBBinaryTree.prototype.max = function() {
    if (null === this.root) {
      return null;
    }
    var x = this.root;
    while(null !== x.right) {
      x = x.right;
    }
    return x.key;
  };

  RBBinaryTree.prototype.floor = function(key) {
    var x = this._floor(this.root, key);
    if (null === x) return null;
    return x.key;
  };

  RBBinaryTree.prototype._floor = function(x, key) {
    if (null === x) return null;
    var cmp = key.compareTo(x.key);

    if (0 === cmp) return x;
    if (0 > cmp) return this._floor(x.left, key);
    
    var t = this._floor(x.right, key);
    if (null !== t) return t;
    return x;
  };

  RBBinaryTree.prototype.ceiling = function(key) {
    var x = this._ceiling(this.root, key);
    if (null === x) return null;
    return x.key;
  };

  RBBinaryTree.prototype._ceiling = function(x, key) {
    if (null === x) return null;
    var cmp = key.compareTo(x.key);

    if (0 === cmp) return x;
    if (0 < cmp) return this._ceiling(x.right, key);
    
    var t = this._ceiling(x.left, key);
    if (null !== t) return t;
    return x;
  };

  RBBinaryTree.prototype.size = function() {
    return this._size(this.root);
  };

  RBBinaryTree.prototype._size = function(x) {
    if (null === x) return 0;
    return x.count;
  };

  RBBinaryTree.prototype.rank = function(key) {
    return this._rank(key, this.root);
  };

  RBBinaryTree.prototype._rank = function(key, x) {
    if (null === x) return 0;
    var cmp = key.compareTo(x.key);
    if (0 > cmp) return this._rank(key, x.left);
    if (0 < cmp) return 1 + this._size(x.left) + this._rank(key, x.right);
    return this._size(x.left);
  };

  RBBinaryTree.prototype.toArray = function() {
    var a = [];
    this._toArray(a, this.root);
    return a;
  };

  RBBinaryTree.prototype._toArray = function(a, x) {
    if (null === x) return;
    this._toArray(a, x.left);
    a.push(x.value);
    this._toArray(a, x.right);
  }

  RBBinaryTree.prototype._isRed = function(x) {
    if (null === x) return BLACK;
    return RED === x.color;
  };

  RBBinaryTree.prototype._rotateLeft = function(h) {
    // assert this._isRed(h.right)
    var x = h.right;
    h.right = x.left;
    x.left = h
    x.color = h.color;
    h.color = RED;
    return x;
  };

  RBBinaryTree.prototype._rotateRight = function(h) {
    // assert this._isRed(h.left)
    var x = h.left;
    h.left = x.right;
    x.right = h
    x.color = h.color;
    h.color = RED;
    return x;
  };

  RBBinaryTree.prototype._flipColors = function(h) {
    // assert !this._isRed(h)
    // assert this._isRed(h.left)
    // assert this._isRed(h.right)
    h.color = RED;
    h.left.color = BLACK;
    h.right.color = BLACK;
  }

})();