/**
 * Created by lsq on 2022/8/21.
 */

'use strict';


/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate1(matrix: number[][]): void {
    // 写法不符合要求
    const matrixLen = matrix.length;
    const result = new Array(matrixLen).fill(0).map((_item) => new Array(matrixLen).fill(0));
    for (let x = 0; x < matrixLen; x++) {
        for (let y = 0; y < matrixLen; y++) {
            result[y][matrixLen - 1 - x] = matrix[x][y];
        }
    }
    console.log(result);
};

function rotate2(matrix: number[][]): void {
    const matrixLen = matrix.length;
    for(let y=0;y<matrixLen/2;y++) {
        for (let x = y; x < matrixLen - 1-y; x++) {
            let temp = matrix[x][matrixLen - 1-y];// 左上角
            matrix[x][matrixLen - 1-y] = matrix[y][x];

            let temp2 = matrix[matrixLen - 1-y][matrixLen - 1 - x];// 右上角
            matrix[matrixLen - 1-y][matrixLen - 1 - x] = temp;

            temp = matrix[matrixLen - 1 - x][y];// 右下角
            matrix[matrixLen - 1 - x][y] = temp2;

            matrix[y][x] = temp;// 左下角
        }
    }
    console.log('最终结果是：\n',matrix);
};


// rotate2([
//     [1,2,3],
//     [4,5,6],
//     [7,8,9]
// ]);

// rotate2([
//     [5, 1, 9, 11],
//     [2, 4, 8, 10],
//     [13, 3, 6, 7],
//     [15, 14, 12, 16]
// ]);

// rotate2([
//     [1]
// ]);

// rotate2([
//     [1, 2],
//     [3, 4]
// ]);

/**
 * 1、新建个数组的情况
 * len=3             len=n
 * (0,0)=>(0,2)      (0,n-1)
 * (0,1)=>(1,2)      (1,n-1)
 * (0,2)=>(2,2)      (2,n-1)
 * ...
 * (0,n-1)=>(n-1,n-1)
 *
 * (1,0)=>(0,1)      (0,n-1-1)
 * (1,1)=>(1,1)      (1,n-1-1)
 * (1,2)=>(2,1)      (2,n-1-1)
 * ...
 * (1,n-1)=>(n-1,n-1-1)
 *
 * (x,y)=>(y,n-1-x)
 *
 * 2、修改原本数组的情况
 * 原数组：
 * [
 [1,2,3],
 [4,5,6],
 [7,8,9]
 ]
 * 一轮循环:
 * [1,2,1],[4,5,6],[7,8,9]
 * [1,2,1],[4,5,6],[7,8,3]
 * [1,2,1],[4,5,6],[9,8,3]
 * [7,2,1],[4,5,6],[9,8,3]
 *
 * 二轮循环：
 * [7,2,1],[4,5,2],[9,8,3]
 * [7,2,1],[4,5,2],[9,6,3]
 * [7,2,1],[8,5,2],[9,6,3]
 * [7,4,1],[8,5,2],[9,6,3]
 *
 */


// 2024.05.22
function rotate(matrix: number[][]): void {
 const length = matrix.length
 const width = matrix[0].length
 let result = new Array(length-1)
 for(let i=0;i<length;i++){
   result[i] = new Array(width-1)
 }
 for (let i = 0; i < length; i++) {
   for (let j = 0; j < width; j++) {
     result[j][length-i-1] = matrix[i][j]
   }
 }
 console.log(result)
}

const matrix = [
 [1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]
]
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
rotate(matrix)