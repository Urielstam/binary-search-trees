const node = (data = null, left = null, right = null) => {
    return {
        data,
        left,
        right
    }
}

const tree = ((arr) => {
    let root;
    let array = arr;

    return {
        root,
        array
    }
})();


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


const buildTree = (arr) => {
    let sortedArr = [...new Set(arr)].sort((a, b) => a -b);
    // arr.sort((a, b) => a - b);
    // let sortedArr = arr.filter((value, index, self) => self.indexOf(value) === index);
    if(sortedArr.length <= 0) return null
    let mid = parseInt(sortedArr.length / 2);
    // console.log(mid);

    let rootNode = node(sortedArr[mid]);
    
    rootNode.left = buildTree(sortedArr.slice(0, mid));
    rootNode.right = buildTree(sortedArr.slice(mid + 1));

    
    return rootNode;

}

const rootNode = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(rootNode.data);
prettyPrint(rootNode);

