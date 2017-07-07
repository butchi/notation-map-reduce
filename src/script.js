(function() {
  'use strict';
  class NpmStarter {
    constructor(option) {
      this.initialize(option);
    }

    initialize() {
      const φ = (1 + Math.sqrt(5)) / 2;

      const sum = (p, c) => p + c;

      const total = (arr) => (
        arr.reduce(sum)
      );

      const fromDigits = (arr, method = 10) => {
        if (method == null) {
          return (m) => fromDigits(arr, m);
        } else if (typeof method === 'number') {
          const n = method;
          return fromDigits(arr, pow(n));
        } else if (typeof method === 'function') {
          return arr.map(baseMap(method)).reduce(sum);
        }
      };

      const pow = (n = 10) => x => (
        Math.pow(n, x)
      );

      const pow2 = x => (
        pow(2)(x)
      );

      const fibonacci = (x) => {
        if (x == null) {
          return 0;
        } else if (x === 0) {
          return 1;
        } else if (x === 1) {
          return 2;
        } else {
          return fibonacci(x - 1) + fibonacci(x - 2);
        }
      }

      const baseMap = (f = pow) => (x, i) => x * f(i);

      const range = (a, b) => {
        if (b == null) {
          return Array(a).fill(0).map((_, i) => i);
        } else {
          return Array(b - a).fill(0).map((_, i) => a + i);
        }
      }

      const constantArray = c => n => (new Array(n)).fill(c);

      const zeros = constantArray(0);
      const ones = constantArray(1);

      console.log(fromDigits([0, 1, 0, 1]));
      console.log(fromDigits([0, 1, 0, 1], 10));
      console.log(fromDigits([0, 1, 0, 1], 2));
      console.log(fromDigits([1, 1, 1, 1, 1], -2));
      console.log(fromDigits([1, 0, 1, 0, 1], fibonacci));



      const binaryMod = (m) => (n) => (n % m) < 0 ? (n % m) + 0 + (m < 0 ? -m : m) : (n % m + 0);
      const binaryShiftRight = (method = 10) => {
        if (typeof method === 'number') {
          const base = method;
          return bitShiftRight(base);
        } else {
          const func = method;
          return func;
        }
      }

      const fibonacciMod = n => {
        const r = φ / (1 + 2 * φ);
        const { floor } = Math;

        const ret = floor((n + 2) * r) - floor((n + 1) * r);

        return ret;
      }

      const bitShiftRight = (m = 10) => (n) => n / m;

      const fibonacciShiftRight = (n) => Math.round(n / φ);
      const sr = range(20).reduce((p, c) => {
        return p.concat(fibonacciShiftRight(c));
      }, []);
      // console.log('fibonacciShiftRight:', sr);


      const integerDigitsPositional = (number, base, maxLen = 20) => {
        const arr = zeros(maxLen);

        arr.reduce((p, _c, i) => {
          let m = binaryMod(base)(p);
          let remain = binaryShiftRight(base)(p - m);
          arr[i] = m;
          return remain;
        }, number);

        return arr;
      };

      const integerDigitsWithFunc = (number, mod, shiftRight, maxLen = 20) => {
        const arr = zeros(maxLen);

        arr.reduce((p, _c, i) => {
          let m = mod(p);
          let remain = shiftRight(p - m);
          arr[i] = m;
          return remain;
        }, number);

        return arr;
      };

      const integerDigits = (number, method = 10, maxLen = 20) => {
        if (method == null) {
          return (m) => integerDigits(number, m);
        } else if (typeof method === 'number') {
          const base = method;
          return integerDigitsPositional(number, base, maxLen)
        } else if (method === 'fibonacci') {
          return integerDigitsWithFunc(number, fibonacciMod, fibonacciShiftRight, maxLen);
        }
      }

      console.log('Negabinary:');

      range(20).map(i => {
        const v = fromDigits(integerDigits(i, -2), -2);
        console.log(v);
      });

      console.log('Fibonacci Notation:');

      range(20).map(i => {
        const v = integerDigits(i, 'fibonacci', 10);
        console.log(v);
      });

      console.log('--');
    }
  }

  // export
  global.NpmStarter = NpmStarter;
})();
