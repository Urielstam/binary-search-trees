const node = (data = null, left = null, right = null) => {
    return {
        data,
        left,
        right
    }
}

const buildTree = (arr, start = 0, end = arr.length -1) => {


    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let rootNode = node(arr[mid]);
    rootNode.left = buildTree(arr, start, mid - 1);
    rootNode.right = buildTree(arr, mid + 1, end);

    
    return rootNode;

}

const tree = (arr) => {
    let sortedArr = [...new Set(arr)].sort((a, b) => a -b);
    let root = buildTree(sortedArr);

    // compare val to root 
      // if less move left
      // else move right
    //continue until hit leaf node -> than create leaf node accordingly
    const insert = (value, rootNode = root) => {
      if(rootNode === null) return node(value);

      if(value < rootNode.data) {
        rootNode.left = insert(value, rootNode.left);
      } else {
        rootNode.right = insert(value, rootNode.right);
      }
      return rootNode

    }

    return {
        root,
        sortedArr,
        insert
    }
};


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


let newTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(newTree.root);
newTree.insert(6)
prettyPrint(newTree.root);

