const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

console.log(lines)
const symbolPositions= [];

lines.forEach((v, i) => {
  const matches = [...v.matchAll(/[^0-9.]/g)];
  matches.forEach(m => symbolPositions.push({
    row: i,
    column: m.index
  }));
});

const total = lines.reduce((accumulator, line, currentRow) => {
  const numbers = [...line.matchAll(/\d+/g)];
  let amountToAdd = 0;
  console.log(numbers)
  numbers.forEach(n =>{
    console.log(n[0]);
    if(symbolPositions.find(s => s.row >= currentRow -1
      && s.row <= currentRow + 1
      && s.column >= n.index - 1
      && s.column <= n.index + n[0].length)){
      amountToAdd += Number(n[0]);
    }
  })
  return accumulator + amountToAdd;
}, 0)

console.log(total)