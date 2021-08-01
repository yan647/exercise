function kWeakestRows(mat, k) {
    var width = mat[0].length;
    var temp = [];
    mat.forEach(function (item, index) {
        for (var i = 0; i < width; i++) {
            if (item[i] === 0) {
                temp.push({
                    order: i - 1,
                    index: index
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
    });
    return temp.sort(function (a, b) {
        return a.order - b.order;
    }).map(function (item) { return item.index; }).splice(0, k);
}
// console.log(kWeakestRows([[1, 1, 0, 0, 0],
//   [1, 1, 1, 1, 0],
//   [1, 0, 0, 0, 0],
//   [1, 1, 0, 0, 0],
//   [1, 1, 1, 1, 1]], 3));
// console.log(kWeakestRows([[1, 0], [1, 0], [1, 0], [1, 1]], 4));//[0,1,2,3]
console.log(kWeakestRows([[1, 1, 1, 1, 1], [1, 1, 1, 1, 0]], 1)); //[1]
