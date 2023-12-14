import * as fs from 'fs';

const lines = fs.readFileSync('input', 'utf-8').split(/[\r\n]+/g);

interface Coordinate  {
    row: number;
    column: number;
}
enum MoveDirection {
    North,
    East,
    South,
    West
}

function getExitDirection(pipeCharacter: string, enteringDirection: MoveDirection): MoveDirection | undefined{
    switch (pipeCharacter){
        case '|':
            return [MoveDirection.North, MoveDirection.South].includes(enteringDirection) ? enteringDirection : undefined;
        case '-':
            return [MoveDirection.East, MoveDirection.West].includes(enteringDirection) ? enteringDirection : undefined;
        case 'L':
            return enteringDirection === MoveDirection.South ? MoveDirection.East : enteringDirection === MoveDirection.West ? MoveDirection.North : undefined;
        case 'J':
            return enteringDirection === MoveDirection.South ? MoveDirection.West : enteringDirection === MoveDirection.East ? MoveDirection.North : undefined;
        case '7':
            return enteringDirection === MoveDirection.North ? MoveDirection.West : enteringDirection === MoveDirection.East ? MoveDirection.South : undefined;
        case 'F':
            return enteringDirection === MoveDirection.North ? MoveDirection.East : enteringDirection === MoveDirection.West ? MoveDirection.South : undefined;
        default:
            return undefined;
    }
}

function moveInDirection(currentLocation: Coordinate, direction: MoveDirection): Coordinate {
    switch(direction){
        case MoveDirection.North:
            return { row: currentLocation.row - 1, column: currentLocation.column };
        case MoveDirection.East:
            return { row: currentLocation.row, column: currentLocation.column + 1 };
        case MoveDirection.South:
            return { row: currentLocation.row + 1, column: currentLocation.column };
        case MoveDirection.West:
            return { row: currentLocation.row, column: currentLocation.column - 1 };
    }
}

let animalPosition: Coordinate;
const map : string[][] = [];
lines.forEach((line, row) =>{
    map.push([]);
    line.split('').forEach((char, column) => {
        map[row][column] = char;
        if(char === 'S'){
            animalPosition = { row, column };
        }
    })
})

// Find a connected pipe
let moveDirection : MoveDirection | undefined = [MoveDirection.North, MoveDirection.East, MoveDirection.South, MoveDirection.West].find(direction => {
    let nextLocation = moveInDirection(animalPosition, direction);
    return getExitDirection(map[nextLocation.row][nextLocation.column], direction) !== undefined;
});

let steps = 1, currentPosition = moveInDirection(animalPosition, moveDirection);

while(map[currentPosition.row][currentPosition.column] !== 'S') {
    moveDirection = getExitDirection(map[currentPosition.row][currentPosition.column], moveDirection);
    currentPosition = moveInDirection(currentPosition, moveDirection);
    steps++;
}


console.log(map, animalPosition, currentPosition, moveDirection, steps, Math.floor(steps / 2));