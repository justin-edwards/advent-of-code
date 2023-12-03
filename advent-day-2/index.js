const fs = require('fs')

function parsePull (pullString) {
  return {
    red: Number(pullString.match(/(\d+) red/i)?.[1]),
    green: Number(pullString.match(/(\d+) green/i)?.[1]),
    blue: Number(pullString.match(/(\d+) blue/i)?.[1]),
  }
}

function parsePulls (pullsString) {
  const individualPulls = pullsString.split(';')
  return individualPulls.map(parsePull)
}

function parseGame (gameString) {
  const [idPart, pullsPart] = gameString.split(':');
  const game = {
    id: Number(idPart.match(/Game ([0-9]+)/i)[1]),
    pulls: parsePulls(pullsPart),
  }
  game.minRedsRequired = Math.max(...game.pulls.map(p => p.red).filter(n => !isNaN(n)));
  game.minGreensRequired = Math.max(...game.pulls.map(p => p.green).filter(n => !isNaN(n)));
  game.minBluesRequired = Math.max(...game.pulls.map(p => p.blue).filter(n => !isNaN(n)));
  return game;
}

function isLegalGame (pulls) {
  const limits = {
    'red': 12,
    'green': 13,
    'blue': 14
  }
  return !pulls.find(pull => pull.red > limits.red || pull.green > limits.green || pull.blue > limits.blue)
}

const input = fs.readFileSync('input', 'utf-8')
const gameStrings = input.split(/\r?\n/)
const games = gameStrings.map(parseGame)

const legalTotal = games.reduce((accumulator, game) => {
  return accumulator + (isLegalGame(game.pulls) ? game.id : 0);
}, 0)

const powerTotal = games.reduce((acc, game) =>{
  return acc + (
    (isNaN(game.minRedsRequired) ? 1 : game.minRedsRequired) *
    (isNaN(game.minBluesRequired) ? 1 : game.minBluesRequired) *
    (isNaN(game.minGreensRequired) ? 1 : game.minGreensRequired)
  )
}, 0);

console.log(`legal games total: ${legalTotal}, power total: ${powerTotal}`)