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
      "copies": 1
    };
});

cards.forEach((c,i) => {
  let cardsToCopy = 0;
  c.have.forEach(h => {
    if (c.winners.includes(h)) {
      cardsToCopy++;
    }
  })
  for(let j = 0; j < cardsToCopy; j++) {
    cards[i + j + 1].copies += c.copies;
  }
});

console.log(cards.reduce((acc, c) => acc + c.copies, 0));