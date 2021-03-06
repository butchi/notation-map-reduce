import { φ } from './util';

export const fibonacciMod = (n) => {
  const r = φ / (1 + 2 * φ);
  const { floor } = Math;

  const ret = floor((n + 2) * r) - floor((n + 1) * r);

  return ret;
};

export const fibonacciShiftRight = n => Math.round(n / φ);

export const fibonacciShiftLeft = n => Math.round(n * φ);
