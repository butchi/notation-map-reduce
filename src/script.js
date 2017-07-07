import { φ, fibonacci, mod, sum, total, pow, pow2, constantArray, zeros, ones, range } from './util';
import { positionalMod, positionalShiftRight } from './positional';
import { fibonacciMod, fibonacciShiftRight } from './fibonacci';

(function() {
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

  class Notation {
    constructor(option) {
      this.initialize(option);
    }

    initialize(option = {}) {
    }

    get constantArray() {
      return constantArray;
    }

    get zeros() {
      return zeros;
    }

    get ones() {
      return ones;
    }

    get range() {
      return range;
    }

    integerDigitsPositional(number, base, maxLen = 20) {
      const arr = zeros(maxLen);

      arr.reduce((p, _c, i) => {
        let m = positionalMod(base)(p);
        let remain = positionalShiftRight(base)(p - m);
        arr[i] = m;
        return remain;
      }, number);

      return arr;
    }

    integerDigitsWithFunc(number, mod, shiftRight, maxLen = 20) {
      const arr = zeros(maxLen);

      arr.reduce((p, _c, i) => {
        let m = mod(p);
        let remain = shiftRight(p - m);
        arr[i] = m;
        return remain;
      }, number);

      return arr;
    }

    integerDigits(number, method = 10, maxLen = 20) {
      if (method == null) {
        return (m) => this.integerDigits(number, m);
      } else if (typeof method === 'number') {
        const base = method;
        return this.integerDigitsPositional(number, base, maxLen)
      } else if (method === 'fibonacci') {
        return this.integerDigitsWithFunc(number, fibonacciMod, fibonacciShiftRight, maxLen);
      }
    }

    fromDigits(arr, method = 10) {
      const baseMap = (f = pow) => {
        return (x, i) => x * f(i);
      };

      if (method == null) {
        return m => this.fromDigits(arr, m);
      } else if (typeof method === 'number') {
        const n = method;
        return this.fromDigits(arr, pow(n));
      } else if (typeof method === 'function') {
        return arr.map(baseMap(method)).reduce(sum);
      }
    }
  }

  // export
  global.Notation = Notation;
})();
