export const φ = (1 + Math.sqrt(5)) / 2;

export const fibonacci = x => {
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

export const sum = (p, c) => p + c;

export const total = arr => arr.reduce(sum);

export const pow = (n = 10) => x => Math.pow(n, x);

export const pow2 = x => pow(2)(x);

export const constantArray = c => n => (new Array(n)).fill(c);

export const zeros = constantArray(0);

export const ones = constantArray(1);

export const range = (a, b) => {
  if (b == null) {
    return Array(a).fill(0).map((_, i) => i);
  } else {
    return Array(b - a).fill(0).map((_, i) => a + i);
  }
}

