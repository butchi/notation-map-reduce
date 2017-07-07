export const positionalMod = (m) => {
  return n => (n % m) < 0 ? (n % m) + 0 + (m < 0 ? -m : m) : (n % m + 0);
};

export const positionalShiftRight = (m = 10) => {
  return n => n / m;
};
