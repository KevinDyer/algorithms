'use strict';

(function() {
  var Node = function(root, data) {
    this.data = data;

    this.root = root;
    this.left = null;
    this.right = null;
  };

  var BinaryTree = function() {
    this.root = null;
  };

  BinaryTree.prototype.insert = function(data) {
    if (null === this.root) {
      this.root = new Node(null, data);
    } else {
      this.insert(this.root, data);
    }
  };

  BinaryTree.prototype.insert = function(root, data) {
    if (data < root.data) {
      if (null === root.left) {
        root.left = new Node(root, data);
      } else {
        this.insert(root.left, data);
      }
    } else {
      if (null === root.right) {
        root.right = new Node(root, data);
      } else {
        this.insert(root.right, data);
      }
    }
  };
})();