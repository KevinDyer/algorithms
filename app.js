'use strict';

(function(undefined) {
  var N = 1000;
  var QuickFind = require('./qf.js');
  var qf = new QuickFind(N);
  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  for (var i = 0; i < N; i++) {
    var p = getRandomInt(0, N);
    var q = getRandomInt(0, N);
    qf.union(p, q);
  }

  for (var i = 0; i < 10; i++) {
    var p = getRandomInt(0, N);
    var q = getRandomInt(0, N);
    if (qf.find(p, q)) {
      console.log('Found route.');
    } else {
      console.log('No route.');
    }
})();