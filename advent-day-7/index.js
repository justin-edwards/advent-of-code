const fs = require('fs');
const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

const FIVE_OF_A_KIND = /(.)\1{4}/;
const FOUR_OF_A_KIND = /(.)\1{3}/;
const FULL_HOUSE = /(.)\1{2}(.)\2|(.)\3(.)\4{2}/;
const THREE_OF_A_KIND = /(.)\1{2}/;
const TWO_PAIR = /(.)\1.?(.)\2/;
const ONE_PAIR = /(.).*\1/;
const HIGH_CARD = /.*/;

const HAND_TYPES = [{ regex: FIVE_OF_A_KIND, rank: 1 },
  { regex: FOUR_OF_A_KIND, rank: 2 },
  { regex: FULL_HOUSE, rank: 3 },
  { regex: THREE_OF_A_KIND, rank: 4 },
  { regex: TWO_PAIR, rank: 5 },
  { regex: ONE_PAIR, rank: 6 },
  { regex: HIGH_CARD, rank: 7 }];

const RANK_TO_NAME = {
  1: 'Five of a Kind',
  2: 'Four of a Kind',
  3: 'Full House',
  4: 'Three of a Kind',
  5: 'Two Pair',
  6: 'One Pair',
  7: 'High Card'
}


function getHandTypeRank(hand){

  const jokerCount = hand.replace(/[^J]/gi, '').length;
  const sortedHand = hand.replace(/J/gi, '').split('').sort().join('');

  let rankWithoutJokers = HAND_TYPES.find(ht => ht.regex.test(sortedHand)).rank

  switch(jokerCount){
    case 5:
    case 4:
      return 1;
    case 3:
      return rankWithoutJokers - 5;
    case 2:
      return rankWithoutJokers === 6 ? 2 : rankWithoutJokers - 3;
    case 1:
      return rankWithoutJokers === 7 || rankWithoutJokers == 2 ? rankWithoutJokers - 1 : rankWithoutJokers - 2;
    default:
      return rankWithoutJokers;
  }
}

const cardRanks = {"A": 14,
  "K": 13,
  "Q": 12,
  "J": 1,
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
  const newVar = { hand,
    bet: Number(bet),
    rank: getHandTypeRank(hand)
  };
  return newVar
})

const sortedHands = hands.sort((a, b) => {
  if(a.rank != b.rank) return b.rank - a.rank;

  const handACards = a.hand.split('');
  const handBCards = b.hand.split('');
  for(let i = 0; i < handACards.length; i++){
    if(cardRanks[handACards[i]] != cardRanks[handBCards[i]]){
      return cardRanks[handACards[i]] - cardRanks[handBCards[i]];
    }
  }
  return 0;
});

console.log(sortedHands.map(h => `${h.hand} ${RANK_TO_NAME[h.rank]}`).join('\n'));

console.log(sortedHands.reduce((acc, hand, i) =>  acc + (hand.bet * (i+1)), 0))
