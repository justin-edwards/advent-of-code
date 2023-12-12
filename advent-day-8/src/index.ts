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

let currentNode: Node = {} as Node

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
    if(name === "AAA"){
        currentNode = node;
    }
}
let i = 0;
while(currentNode.name !== "ZZZ"){
    const move = moveList[i%moveList.length];
    if(move === "L"){
        currentNode = currentNode.left;
    } else {
        currentNode = currentNode.right;
    }
    i++;
}

console.log(i);
