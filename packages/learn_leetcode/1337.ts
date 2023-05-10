function kWeakestRows(mat: number[][], k: number): number[] {
  let width = mat[0].length;
  let temp = [];
  mat.forEach((item, index) => {
    for (let i = 0; i < width; i++) {
      if (item[i] === 0) {
        temp.push({
          order: i - 1,
          index
        });
        break;
      }
      if (i === width - 1) {
        temp.push({
          order: width,
          index: index
        });
      }
    }
  })
  return temp.sort((a, b) => {
    return a.order - b.order;
  }).map((item) => item.index).splice(0, k);
}

// console.log(kWeakestRows([[1, 1, 0, 0, 0],
//   [1, 1, 1, 1, 0],
//   [1, 0, 0, 0, 0],
//   [1, 1, 0, 0, 0],
//   [1, 1, 1, 1, 1]], 3));

// console.log(kWeakestRows([[1, 0], [1, 0], [1, 0], [1, 1]], 4));//[0,1,2,3]
console.log(kWeakestRows([[1,1,1,1,1],[1,1,1,1,0]],1))//[1]
