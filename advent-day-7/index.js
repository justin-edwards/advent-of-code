const fs = require('fs');
const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

function getHandTypeRank(hand){
  const fiveOfAKind = /(.)\1{4}/;
  const fourOfAKind = /(.)\1{3}/;
  const fullHouse = /(.)\1{2}(.)\2|(.)\3(.)\4{2}/;
  const threeOfAKind = /(.)\1{2}/;
  const twoPair = /(.)\1.?(.)\2/;
  const onePair = /(.).*\1/;

  const sortedHand = hand.split('').sort().join('');

  if(fiveOfAKind.test(sortedHand)) return 1;
  if(fourOfAKind.test(sortedHand)) return 2;
  if(fullHouse.test(sortedHand)) return 3;
  if(threeOfAKind.test(sortedHand)) return 4;
  if(twoPair.test(sortedHand)) return 5;
  if(onePair.test(sortedHand)) return 6;
  return 7;
}

const cardRanks = {"A": 14,
  "K": 13,
  "Q": 12,
  "J": 11,
  "T": 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2
};

const hands = lines.map(l => {
  const [hand, bet] = l.split(' ')
  return { hand,
    bet: Number(bet),
    rank: getHandTypeRank(hand)
  }
})

const sortedHands = hands.sort((a, b) => {
  if(a.rank != b.rank) return b.rank - a.rank;

  const handACards = a.hand.split('');
  const handBCards = b.hand.split('');
  for(let i = 0; i < handACards.length; i++){
    if(cardRanks[handACards[i]] != cardRanks[handBCards[i]]) return cardRanks[handACards[i]] - cardRanks[handBCards[i]];
  }
  return 0;
});

console.log(sortedHands.reduce((acc, hand, i) =>  acc + (hand.bet * (i+1)), 0))
