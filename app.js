const node = (data, left, right) => {
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


const buildTree = (arr) => {
    // let sortedArr = [...new Set(arr).sort((a, b) => a -b)];
    arr.sort((a, b) => a - b);
    let uniqueArr = arr.filter((value, index, self) => self.indexOf(value) === index);
    // console.log(uniqueArr)
    if(uniqueArr.length <= 0) return null
    
    let mid = Math.floor(uniqueArr.length / 2)
    // console.log(mid);

    let rootNode = node(uniqueArr[mid]);
    
    rootNode.left = buildTree(uniqueArr.slice(0, mid));
    rootNode.right = buildTree(uniqueArr.slice(mid + 1));
    
    return rootNode;

}

const rootNode = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(rootNode.data);

