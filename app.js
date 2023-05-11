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
    const insertNode = (value, rootNode = root) => {
      if(rootNode === null) return node(value);

      if(value < rootNode.data) {
        rootNode.left = insertNode(value, rootNode.left);
      } else {
        rootNode.right = insertNode(value, rootNode.right);
      }
      return rootNode

    }

    const minValue = (root) => {
      let minV = root.data;
      while (root.left != null) {
        minV = root.left.data;
        root = root.left;
      }
      return minV;
    };

    const deleteNode = (value, rootNode = root) => {
      // base case tree is empty
      if (rootNode === null) return rootNode;
      // other wise recur down tree
      if (value < rootNode.data) {
        rootNode.left = deleteNode(value, rootNode.left);
      } else if (value > rootNode.data) {
        rootNode.right = deleteNode(value, rootNode.right);
      } // if value is root.data
      else {
        // if node is leaf or one child
        if (rootNode.left === null) {
          return rootNode.right;
        } else if (rootNode.right === null) {
          return rootNode.left;
        }
        // with two children, find inorder successor
        rootNode.data = minValue(rootNode.right);
        // delete inorder successor
        rootNode.right = deleteNode(rootNode.data, rootNode.right);
      }
      return rootNode;
    }


    return {
        root,
        sortedArr,
        insertNode,
        deleteNode
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
console.log(newTree.root.data);
newTree.insertNode(6)
newTree.deleteNode(4)
prettyPrint(newTree.root);

