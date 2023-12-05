const fs = require('fs')
const input = fs.readFileSync('input', 'utf-8')
  .replace(/[\r\n ]{2,}/g, '\n')
  .split(/\n/)
  .map(line => line.trim())

const seeds = input[0].split(': ')[1].split(' ').map(n => {
  return {
    'seedId': Number(n),
    'location': Number(n)
  }
})

const maps = [] // {name, [{destinationRangeStart, sourceRangeStart, rangeLength}]}
let currentMap = null;
for (let i = 1; i < input.length; i++) {
  if(input[i].match(/[a-zA-Z]/)){
    currentMap && maps.push(currentMap);
    currentMap ={
      name: input[i],
      ranges: []
    }
  } else {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = input[i].split(
        ' ').map(Number)
    currentMap.ranges.push({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength
    })
  }
}
maps.push(currentMap);

maps.forEach(m => {
  seeds.forEach(s => {
    const applicableRange = m.ranges.find(r => s.location >= r.sourceRangeStart && s.location < r.sourceRangeStart + r.rangeLength);
    if(applicableRange){
      s.location += applicableRange.destinationRangeStart - applicableRange.sourceRangeStart;
    }
  })

  // seeds.filter(s => s.location >= m.sourceRangeStart && s.location < m.sourceRangeStart + m.rangeLength)
  //   .forEach(s => {
  //     console.log(s.location, m.sourceRangeStart, m.destinationRangeStart, m.destinationRangeStart - m.sourceRangeStart, s.location + m.destinationRangeStart - m.sourceRangeStart);
  //     s.location += m.destinationRangeStart - m.sourceRangeStart;
  // });
})

console.log(seeds.reduce((minLocationSeed, currentSeed) => {
  return minLocationSeed.location < currentSeed.location? minLocationSeed : currentSeed;
}))