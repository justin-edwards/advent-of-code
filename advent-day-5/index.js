const fs = require('fs')
const input = fs.readFileSync('input', 'utf-8')
  .replace(/[\r\n ]{2,}/g, '\n')
  .split(/\n/)
  .map(line => line.trim())

const seedArray = input[0].split(': ')[1].split(' ');

const seedRanges = [];

for (let i = 0; i < seedArray.length; i+=2) {
  const rangeStart = Number(seedArray[i]);
  const rangeEnd = Number(seedArray[i+1]) + rangeStart - 1;
  seedRanges.push([rangeStart, rangeEnd]);
}

const maps = []
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
      sourceRangeStart,
      "sourceRangeEnd": sourceRangeStart + rangeLength,
      "rangeModifier": destinationRangeStart - sourceRangeStart
    })
  }
}
maps.push(currentMap);

function applyMaps(seedLocation){
  let finalLocation = seedLocation;
  maps.forEach(m => {
    const applicableRange = m.ranges.find(r => r.sourceRangeStart <= finalLocation && r.sourceRangeEnd >= finalLocation);
    if(applicableRange){
      finalLocation += applicableRange.rangeModifier;
    }
  })
  return finalLocation;
}

//Find the lowest final seed location
const minLocation = seedRanges.reduce((globalMinLocation, currentSeedRange) =>{
  let localMinLocation = Number.MAX_VALUE;
  for(let i = currentSeedRange[0]; i < currentSeedRange[1]; i++){
    const finalLocation = applyMaps(i);
    if(finalLocation < localMinLocation){
      localMinLocation = finalLocation;
    }
  }
  return globalMinLocation < localMinLocation ? globalMinLocation : localMinLocation;
}, Number.MAX_VALUE);


console.log(minLocation)