(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fibonacciShiftRight = exports.fibonacciMod = undefined;

var _util = require('./util');

var fibonacciMod = exports.fibonacciMod = function fibonacciMod(n) {
  var r = _util.φ / (1 + 2 * _util.φ);
  var floor = Math.floor;


  var ret = floor((n + 2) * r) - floor((n + 1) * r);

  return ret;
};

var fibonacciShiftRight = exports.fibonacciShiftRight = function fibonacciShiftRight(n) {
  return Math.round(n / _util.φ);
};

},{"./util":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var positionalMod = exports.positionalMod = function positionalMod(m) {
  return function (n) {
    return n % m < 0 ? n % m + 0 + (m < 0 ? -m : m) : n % m + 0;
  };
};

var positionalShiftRight = exports.positionalShiftRight = function positionalShiftRight() {
  var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  return function (n) {
    return n / m;
  };
};

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _positional = require('./positional');

var _fibonacci = require('./fibonacci');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  // export const shiftRight = (method = 10) => {
  //   if (typeof method === 'number') {
  //     const base = method;
  //     return positionalShiftRight(base);
  //   } else {
  //     const func = method;
  //     return func;
  //   }
  // };

  var Notation = function () {
    function Notation(option) {
      _classCallCheck(this, Notation);

      this.initialize(option);
    }

    _createClass(Notation, [{
      key: 'initialize',
      value: function initialize() {
        var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      }
    }, {
      key: 'integerDigitsPositional',
      value: function integerDigitsPositional(number, base) {
        var maxLen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

        var arr = (0, _util.zeros)(maxLen);

        arr.reduce(function (p, _c, i) {
          var m = (0, _positional.positionalMod)(base)(p);
          var remain = (0, _positional.positionalShiftRight)(base)(p - m);
          arr[i] = m;
          return remain;
        }, number);

        return arr;
      }
    }, {
      key: 'integerDigitsWithFunc',
      value: function integerDigitsWithFunc(number, mod, shiftRight) {
        var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;

        var arr = (0, _util.zeros)(maxLen);

        arr.reduce(function (p, _c, i) {
          var m = mod(p);
          var remain = shiftRight(p - m);
          arr[i] = m;
          return remain;
        }, number);

        return arr;
      }
    }, {
      key: 'integerDigits',
      value: function integerDigits(number) {
        var _this = this;

        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var maxLen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

        if (method == null) {
          return function (m) {
            return _this.integerDigits(number, m);
          };
        } else if (typeof method === 'number') {
          var base = method;
          return this.integerDigitsPositional(number, base, maxLen);
        } else if (method === 'fibonacci') {
          return this.integerDigitsWithFunc(number, _fibonacci.fibonacciMod, _fibonacci.fibonacciShiftRight, maxLen);
        }
      }
    }, {
      key: 'fromDigits',
      value: function fromDigits(arr) {
        var _this2 = this;

        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        var baseMap = function baseMap() {
          var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _util.pow;

          return function (x, i) {
            return x * f(i);
          };
        };

        if (method == null) {
          return function (m) {
            return _this2.fromDigits(arr, m);
          };
        } else if (typeof method === 'number') {
          var n = method;
          return this.fromDigits(arr, (0, _util.pow)(n));
        } else if (typeof method === 'function') {
          return arr.map(baseMap(method)).reduce(_util.sum);
        }
      }
    }, {
      key: 'range',
      get: function get() {
        return _util.range;
      }
    }]);

    return Notation;
  }();

  // export


  global.Notation = Notation;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./fibonacci":1,"./positional":2,"./util":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var φ = exports.φ = (1 + Math.sqrt(5)) / 2;

var fibonacci = exports.fibonacci = function fibonacci(x) {
  if (x == null) {
    return 0;
  } else if (x === 0) {
    return 1;
  } else if (x === 1) {
    return 2;
  } else {
    return fibonacci(x - 1) + fibonacci(x - 2);
  }
};

var sum = exports.sum = function sum(p, c) {
  return p + c;
};

var total = exports.total = function total(arr) {
  return arr.reduce(sum);
};

var pow = exports.pow = function pow() {
  var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  return function (x) {
    return Math.pow(n, x);
  };
};

var pow2 = exports.pow2 = function pow2(x) {
  return pow(2)(x);
};

var constantArray = exports.constantArray = function constantArray(c) {
  return function (n) {
    return new Array(n).fill(c);
  };
};

var zeros = exports.zeros = constantArray(0);

var ones = exports.ones = constantArray(1);

var range = exports.range = function range(a, b) {
  if (b == null) {
    return Array(a).fill(0).map(function (_, i) {
      return i;
    });
  } else {
    return Array(b - a).fill(0).map(function (_, i) {
      return a + i;
    });
  }
};

},{}]},{},[3]);
