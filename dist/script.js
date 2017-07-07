(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var NpmStarter = function () {
    function NpmStarter(option) {
      _classCallCheck(this, NpmStarter);

      this.initialize(option);
    }

    _createClass(NpmStarter, [{
      key: 'initialize',
      value: function initialize() {
        var φ = (1 + Math.sqrt(5)) / 2;

        var sum = function sum(p, c) {
          return p + c;
        };

        var total = function total(arr) {
          return arr.reduce(sum);
        };

        var fromDigits = function fromDigits(arr) {
          var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

          if (method == null) {
            return function (m) {
              return fromDigits(arr, m);
            };
          } else if (typeof method === 'number') {
            var n = method;
            return fromDigits(arr, pow(n));
          } else if (typeof method === 'function') {
            return arr.map(baseMap(method)).reduce(sum);
          }
        };

        var pow = function pow() {
          var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
          return function (x) {
            return Math.pow(n, x);
          };
        };

        var pow2 = function pow2(x) {
          return pow(2)(x);
        };

        var fibonacci = function fibonacci(x) {
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

        var baseMap = function baseMap() {
          var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pow;
          return function (x, i) {
            return x * f(i);
          };
        };

        var range = function range(a, b) {
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

        var constantArray = function constantArray(c) {
          return function (n) {
            return new Array(n).fill(c);
          };
        };

        var zeros = constantArray(0);
        var ones = constantArray(1);

        console.log(fromDigits([0, 1, 0, 1]));
        console.log(fromDigits([0, 1, 0, 1], 10));
        console.log(fromDigits([0, 1, 0, 1], 2));
        console.log(fromDigits([1, 1, 1, 1, 1], -2));
        console.log(fromDigits([1, 0, 1, 0, 1], fibonacci));

        var binaryMod = function binaryMod(m) {
          return function (n) {
            return n % m < 0 ? n % m + 0 + (m < 0 ? -m : m) : n % m + 0;
          };
        };
        var binaryShiftRight = function binaryShiftRight() {
          var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

          if (typeof method === 'number') {
            var base = method;
            return bitShiftRight(base);
          } else {
            var func = method;
            return func;
          }
        };

        var fibonacciMod = function fibonacciMod(n) {
          var r = φ / (1 + 2 * φ);
          var floor = Math.floor;


          var ret = floor((n + 2) * r) - floor((n + 1) * r);

          return ret;
        };

        var bitShiftRight = function bitShiftRight() {
          var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
          return function (n) {
            return n / m;
          };
        };

        var fibonacciShiftRight = function fibonacciShiftRight(n) {
          return Math.round(n / φ);
        };
        var sr = range(20).reduce(function (p, c) {
          return p.concat(fibonacciShiftRight(c));
        }, []);
        // console.log('fibonacciShiftRight:', sr);


        var integerDigitsPositional = function integerDigitsPositional(number, base) {
          var maxLen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

          var arr = zeros(maxLen);

          arr.reduce(function (p, _c, i) {
            var m = binaryMod(base)(p);
            var remain = binaryShiftRight(base)(p - m);
            arr[i] = m;
            return remain;
          }, number);

          return arr;
        };

        var integerDigitsWithFunc = function integerDigitsWithFunc(number, mod, shiftRight) {
          var maxLen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 20;

          var arr = zeros(maxLen);

          arr.reduce(function (p, _c, i) {
            var m = mod(p);
            var remain = shiftRight(p - m);
            arr[i] = m;
            return remain;
          }, number);

          return arr;
        };

        var integerDigits = function integerDigits(number) {
          var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
          var maxLen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

          if (method == null) {
            return function (m) {
              return integerDigits(number, m);
            };
          } else if (typeof method === 'number') {
            var base = method;
            return integerDigitsPositional(number, base, maxLen);
          } else if (method === 'fibonacci') {
            return integerDigitsWithFunc(number, fibonacciMod, fibonacciShiftRight, maxLen);
          }
        };

        console.log('Negabinary:');

        range(20).map(function (i) {
          var v = fromDigits(integerDigits(i, -2), -2);
          console.log(v);
        });

        console.log('Fibonacci Notation:');

        range(20).map(function (i) {
          var v = integerDigits(i, 'fibonacci', 10);
          console.log(v);
        });

        console.log('--');
      }
    }]);

    return NpmStarter;
  }();

  // export


  global.NpmStarter = NpmStarter;
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
