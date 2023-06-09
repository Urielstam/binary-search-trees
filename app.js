/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const node = (data = null, left = null, right = null) => ({
  data,
  left,
  right
});

const tree = (arr) => {
  const sortedArr = [...new Set(arr)].sort((a, b) => a - b);

  const buildTree = (arr, start = 0, end = arr.length - 1) => {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const rootNode = node(arr[mid]);
    rootNode.left = buildTree(arr, start, mid - 1);
    rootNode.right = buildTree(arr, mid + 1, end);

    return rootNode;
  };

  let root = buildTree(sortedArr);

  // compare val to root
  // if less move left
  // else move right
  // continue until hit leaf node -> than create leaf node accordingly
  const insertNode = (value, rootNode = root) => {
    if (rootNode === null) return node(value);

    if (value < rootNode.data) {
      rootNode.left = insertNode(value, rootNode.left);
    } else {
      rootNode.right = insertNode(value, rootNode.right);
    }
    return rootNode;
  };

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
      }
      if (rootNode.right === null) {
        return rootNode.left;
      }
      // with two children, find inorder successor
      rootNode.data = minValue(rootNode.right);
      // delete inorder successor
      rootNode.right = deleteNode(rootNode.data, rootNode.right);
    }
    return rootNode;
  };

  const find = (value, rootNode = root) => {
    if (rootNode === null) return false;
    if (rootNode.data === value) return rootNode;
    if (value < rootNode.data) {
      return find(value, rootNode.left);
    }
    if (value > rootNode.data) {
      return find(value, rootNode.right);
    }
    return rootNode;
  };

  const levelOrder = (callback) => {
    // Traverse tree using breadth-first
    if (root === null) return [];
    const queue = [root];
    const result = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      if (callback) callback(node);
      else result.push(node.data);
    }
    return result;
  };

  const inorder = (callback, rootNode = root, result = []) => {
    if (rootNode === null) return [];
    // if root.left then callback and do so for all left
    inorder(callback, rootNode.left, result);
    if (callback) callback(rootNode);
    else result.push(rootNode.data);
    inorder(callback, rootNode.right, result);
    return result;
  };

  const preorder = (callback, rootNode = root, result = []) => {
    if (rootNode === null) return [];
    if (callback) callback(rootNode);
    else result.push(rootNode.data);
    preorder(callback, rootNode.left, result);
    preorder(callback, rootNode.right, result);
    return result;
  };

  const postorder = (callback, rootNode = root, result = []) => {
    if (rootNode === null) return [];
    postorder(callback, rootNode.left, result);
    postorder(callback, rootNode.right, result);
    if (callback) callback(rootNode);
    else result.push(rootNode.data);
    return result;
  };

  const height = (rootNode = root) => {
    if (rootNode === null) return -1;
    const leftHeight = height(rootNode.left);
    const rightHeight = height(rootNode.right);
    return Math.max(leftHeight, rightHeight) + 1;
  };

  const depth = (node, rootNode = root, level = 0) => {
    if (!node) return null;
    if (rootNode === null) return 0;
    if (rootNode.data === node.data) return level;
    const count = depth(node, rootNode.left, level + 1);
    if (count !== 0) return count;
    return depth(node, rootNode.right, level + 1);
  };

  const testBalanced = (rootNode) => {
    // Check if balanced
    // check heights of left and right tree
    if (rootNode == null) return 0;
    const leftHeight = testBalanced(rootNode.left);
    const rightHeight = testBalanced(rootNode.right);
    const diff = Math.abs(leftHeight - rightHeight);

    if (leftHeight === -1 || rightHeight === -1 || diff > 1) {
      return -1;
    }
    return Math.max(leftHeight, rightHeight) + 1;
  };

  const isBalanced = () => {
    const balanced = testBalanced(root) !== -1;
    return balanced;
  };

  const rebalance = () => {
    const arr = levelOrder();
    arr.sort((a, b) => a - b);
    root = buildTree(arr);
    return root;
  };

  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
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
  };

  return {
    root,
    sortedArr,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint
  };
};

const randomArray = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const newTree = tree(randomArray(10));

newTree.insertNode(300);
newTree.insertNode(400);
newTree.insertNode(200);
newTree.insertNode(4);

newTree.prettyPrint();

console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());

newTree.prettyPrint();
