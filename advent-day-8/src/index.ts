import * as fs from 'fs';

const lines = fs.readFileSync('input', 'utf-8').split(/[\r\n]+/g);

type Node = {
    name: string;
    left: Node;
    right: Node;
}
enum ChildType{
    Left,
    Right
}
type WaitingListEntry = {
    node: Node;
    childType: ChildType;
}

const waitingList: { [name: string]: WaitingListEntry[] } = {};

const parsedNodeList: { [name: string]: Node } = {};

const moveList: string = lines[0];

let startNodes: Node[] = [] as Node[];
let endNodes: Node[] = [] as Node[];


function assignChildNodeOrAddToWaitList(node: Node, childType: ChildType, name: string){
    if(parsedNodeList[name]){
        if(childType === ChildType.Left){
            node.left = parsedNodeList[name];
        } else {
            node.right = parsedNodeList[name];
        }
    } else {
        if(!waitingList[name]){
            waitingList[name] = [];
        }
        waitingList[name].push({ node, childType });
    }
}

for (let i = 1; i < lines.length; i++){
    let [name, left, right] = lines[i].split(/[ =(,)]+/g)
    const node: Node = { name } as Node;
    parsedNodeList[name] = node;
    assignChildNodeOrAddToWaitList(node, ChildType.Left, left);
    assignChildNodeOrAddToWaitList(node, ChildType.Right, right);

    for(const entry of waitingList[name] || []){
        if(entry.childType === ChildType.Left){
            entry.node.left = node;
        } else {
            entry.node.right = node;
        }
    }
    if(name.match(/..A/g)){
        startNodes.push(node);
    } else if (name.match(/..Z/g)){
        endNodes.push(node);
    }
}

let pathLengths :number[]  = [];

startNodes.forEach(n =>{
    let i = 0;
    let currentNode = n;
    do{
        const move = moveList[i%moveList.length];
        if(move === "L"){
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
        if(endNodes.find(end => end === currentNode)){
            pathLengths.push(i + 1);
            console.log(n.name, i + 1, (i + 1) % moveList.length, currentNode.name);
            break;
        }
        i++;
    } while (currentNode !== n || i%moveList.length === 0)
})


function calculateLCM (lengths : number[]) : number {
    function getGCD(a : number, b : number) : number {
        if (b === 0) {
            return a;
        }
        return getGCD(b, a % b);
    }

    function getLCM(a : number, b : number) : number {
        return (a * b) / getGCD(a, b);
    }

    let n = 1;
    for(let i = 0; i < lengths.length; i++){
        n = getLCM(n, lengths[i]);
    }
    return n;
}

console.log(calculateLCM(pathLengths));