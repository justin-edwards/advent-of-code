const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

function numberStringToArray(str) {
  return str.trim().split(/\s+/).map(Number)
}


const cards = lines.map(l => {
    const [have, winners] = l.split(':')[1].split('|');
    return {
      "have": numberStringToArray(have),
      "winners": numberStringToArray(winners),
      "points": 0
    };
});

cards.forEach(c => {
  c.have.forEach(h => {
    if (c.winners.includes(h)) {
      c.points = c.points ? c.points * 2 : 1;
    }
  });
});

console.log(cards.reduce((acc, c) => acc + c.points, 0));