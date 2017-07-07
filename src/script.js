import { φ, fibonacci, mod, sum, total, pow, pow2, constantArray, zeros, ones, range } from './util';
import { positionalShiftLeft, positionalShiftRight, positionalMod } from './positional';
import { fibonacciShiftLeft, fibonacciShiftRight, fibonacciMod } from './fibonacci';

(function() {
  'use strict';

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

    integerDigitsWithFunc(number, pick, pull, maxLen = 20) {
      const arr = zeros(maxLen);

      arr.reduce((p, _c, i) => {
        let m = pick(p);
        let remain = pull(p - m);
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
        return this.integerDigitsWithFunc(number, positionalMod(base), positionalShiftRight(base), maxLen)
      } else if (method === 'fibonacci') {
        return this.integerDigitsWithFunc(number, fibonacciMod, fibonacciShiftRight, maxLen);
      }
    }

    fromDigitsWithFunc(arr, push) {
      let weight = 1;

      const ret = arr.reduce((p, c, _i) => {
        const val = p + c * weight;
        weight = push(weight);
        return val;
      }, 0);

      return ret;
    }

    fromDigits(arr, method = 10) {
      if (method == null) {
        return m => this.fromDigits(arr, m);
      } else if (typeof method === 'number') {
        const base = method;
        return this.fromDigits(arr, positionalShiftLeft(base));
      } else if (method === 'fibonacci') {
        return this.fromDigitsWithFunc(arr, fibonacciShiftLeft);
      } else if (typeof method === 'function') {
        const push = method;

        return this.fromDigitsWithFunc(arr, push);
        // return arr.map(baseMap(method)).reduce(sum);
      }
    }
  }

  // export
  global.Notation = Notation;
})();
