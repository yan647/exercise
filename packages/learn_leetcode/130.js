/**
 * Created by lsq on 2020/10/25.
 */

'use strict';

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  if (board.length === 0 || board == null) {
    return;
  }

  function union(a, b) {
    let x = find(a), y = find(b);
    if (x === b) {
      return;
    } else parent[x] = y;
  }

  function find(a) {
    if (parent[a] === a) {
      return a;
    } else return find(parent[a]);
  }

  let row = board.length,
    col = board[0].length,
    parent = {}, cannot = "not";
  parent[cannot] = cannot;
  for (let a = 0; a < row; a++) {
    for (let b = 0; b < col; b++) {
      parent[a + "-" + b] = a + "-" + b;
    }
  }
  for (let a = 0; a < row; a++) {
    for (let b = 0; b < col; b++) {
      if (board[a][b] === "O") {
        if (a === 0 || b === 0 || a === row - 1 || b === col - 1) {
          union(a + "-" + b, cannot);
        } else {
          a - 1 >= 0 && board[a - 1][b] === "O" && union(a + "-" + b, (a - 1) + "-" + b);
          b - 1 >= 0 && board[a][b - 1] === "O" && union(a + "-" + b, a + "-" + (b - 1));
          a + 1 < row && board[a + 1][b] === "O" && union(a + "-" + b, (a + 1) + "-" + b);
          b + 1 < col && board[a][b + 1] === "O" && union(a + "-" + b, a + "-" + (b + 1));
        }
      }
    }
  }

  for (let a = 1; a < row - 1; a++) {
    for (let b = 1; b < col - 1; b++) {
      board[a][b] === "O" && find(a + "-" + b) !== find(cannot) && (board[a][b] = "X");
    }
  }
  return board;

};

// console.log(solve([["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]));
console.log(solve([["O", "O", "O"], ["O", "O", "O"], ["O", "O", "O"]]));
