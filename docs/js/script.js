const testElm = document.querySelector('.test');

const trTmpl = (tdArr) => `<tr class="elm-tr">${tdArr.join('')}</tr>`;
const tdTmpl = (txt) => `<td class="elm-td">${txt}</td>`;
const tdArr = (arr) => arr.map(elm => tdTmpl(elm));
const tableHtml = (arr) => trTmpl(tdArr(arr));
const createTable = (className) => {
  const table = document.createElement('table');
  table.classList.add('elm-table');

  if (className) {
    table.classList.add(className);
  }

  return table;
}

const notation = new Notation();


const getTable = (n, mode = 10, len = 20) => notation.range(n).map((v) => {
  const arr = notation.integerDigits(v, mode, len);

  return tableHtml(
    [ v ].concat([notation.fromDigits(arr, mode)])
      .concat(
        arr.reverse()
      )
  );
}).join('');

const getHead = (mode = 10, len = 20) => {
  const weightDigitsArr = [];
  notation.range(len).reduce((p) => {
    weightDigitsArr.push(p);

    const ret = [0].concat(p);

    return ret;
  }, [1]);

  return weightDigitsArr.map((weightDigits) => {
    return notation.fromDigits(weightDigits, mode, len)
  }).reverse();
}

const generateTable = (opts = {}) => {
  const { name, className, max, mode, len } = opts;

  const tableElm = createTable(className);

  const headWeightArr = getHead(mode, len);
  const head = tableHtml(['', ''].concat(headWeightArr));

  const html = getTable(max, mode, len);
  tableElm.innerHTML = head + html;

  const heading = document.createElement('h2');
  heading.classList.add('heading');
  heading.innerHTML = name;

  testElm.append(heading);
  testElm.append(tableElm);
}

generateTable({
  name: '10進数',
  className: 'tbl-decimal',
  max: 64,
  mode: 10,
  len: 4,
});

generateTable({
  name: '2進数',
  className: 'tbl-binary',
  max: 64,
  mode: 2,
  len: 10,
});

generateTable({
  name: '-2進数',
  className: 'tbl-negabinary',
  max: 64,
  mode: -2,
  len: 10,
});

generateTable({
  name: 'フィボナッチ記数法',
  className: 'tbl-fibonacci',
  max: 64,
  mode: 'fibonacci',
  len: 10,
});

// notation.range(20).map(i => {
//   const v = notation.fromDigits(notation.integerDigits(i, -2), -2);
//   console.log(v);
// });

// console.log('Fibonacci Notation:');

// notation.range(20).map(i => {
//   const v = notation.fromDigits(notation.integerDigits(i, 'fibonacci', 10), 'fibonacci');
//   console.log(v);
// });

// console.log('--');
