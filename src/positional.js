export const positionalMod = m => n => (n % m) < 0 ? (n % m) + 0 + (m < 0 ? -m : m) : (n % m + 0);

export const positionalShiftRight = (m = 10) => n => n / m;

export const positionalShiftLeft = (m = 10) => n => n * m;
