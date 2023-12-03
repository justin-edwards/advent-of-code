const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

const symbolPositions= [];

lines.forEach((v, i) => {
  const matches = [...v.matchAll(/[*]/g)];
  matches.forEach(m => symbolPositions.push({
    row: i,
    column: m.index,
    parts: []
  }));
});

lines.forEach((line, currentRow) => {
  const numbers = [...line.matchAll(/\d+/g)];
  numbers.forEach(n =>{
    symbolPositions.filter(s => s.row >= currentRow -1
        && s.row <= currentRow + 1
        && s.column >= n.index - 1
        && s.column <= n.index + n[0].length).forEach(v => v.parts.push(n));
  });
});

total = symbolPositions.filter(s => s.parts.length === 2).reduce((acc, gear) => gear.parts[0] * gear.parts[1] + acc, 0)

console.log(total)