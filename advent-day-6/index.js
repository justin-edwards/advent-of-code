const fs = require('fs');

const lines = fs.readFileSync('input', 'utf-8').split(/\r?\n/);

function numberStringToArray(str) {
  return str.trim().split(/\s+/).map(Number)
}

const times = numberStringToArray(lines[0].split(':')[1]);
const distances = numberStringToArray(lines[1].split(':')[1]);

const records = times.map((t, i) => {
  return {
    "time": t,
    "distance": distances[i]
  }
});

const waysToBeat = records.map(r =>{
  return Array.from({length: r.time}, (_, i) => i).reduce((acc, i) => {
    return i * (r.time - i) > r.distance ? acc + 1 : acc;
  })
})

console.log(waysToBeat.reduce((acc, w) => acc * w, 1));