const notation = new Notation();

console.log(notation.integerDigits(0, -2));

console.log(notation.fromDigits([0, 1, 0, 1]));
console.log(notation.fromDigits([0, 1, 0, 1], 10));
console.log(notation.fromDigits([0, 1, 0, 1], 2));
console.log(notation.fromDigits([1, 1, 1, 1, 1], -2));
console.log(notation.fromDigits([1, 0, 1, 0, 1], notation.fibonacci));

console.log('Negabinary:');

notation.range(20).map(i => {
  const v = notation.fromDigits(notation.integerDigits(i, -2), -2);
  console.log(v);
});

console.log('Fibonacci Notation:');

notation.range(20).map(i => {
  const v = notation.integerDigits(i, 'fibonacci', 10);
  console.log(v);
});

console.log('--');
