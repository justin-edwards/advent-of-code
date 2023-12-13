const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').split(/[\r\n]+/g);

const readings = lines.map(l => l.split(' ').map(Number));

function getPreviousValue(sequence){
  console.log(sequence);
  // Base case
  if(sequence.every(v => v === sequence[0])){
    return sequence[0];
  }
  // calculate the next difference array
  let differenceSequence = []
  for(let i = 0; i < sequence.length - 1; i++){
    differenceSequence.push(sequence[i + 1] - sequence[i]);
  }
  return sequence[0] - getPreviousValue(differenceSequence);
}


const sumOfExtrapolatedValues = readings.reduce((acc, reading) => {
  const nextValue = getPreviousValue(reading);
  return acc + nextValue;
}, 0)

console.log(sumOfExtrapolatedValues);