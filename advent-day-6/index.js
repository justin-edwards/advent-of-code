const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

const time = Number(lines[0].replace(/[^\d]/g, ''));
const distance = Number(lines[1].replace(/[^\d]/g, ''));

let waysToBeat = 0;

for(let i = 0; i < time; i++) {
  if(i * (time - i) > distance ) waysToBeat++;
}

console.log(waysToBeat);