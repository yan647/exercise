/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number} m
 * @param {number} n
 * @param {ListNode} head
 * @return {number[][]}
 */
var spiralMatrix = function (m, n, head) {
  let result = new Array(m).fill(new Array(n));
  for(let a=0;a<Math.ceil(m/2);a++){// a表示第几次循环
    /**
     * 上，
     * 第0个循环，0 -- n-1
     * 1，1 -- n-2
     * x, x -- n-x-1
     */
    for(let b=a;b<n-a-1;b++){
      result[a][b]=head[b];
    }

    /**
     * 右
     * 0, [0,n-1] -- [m-1,n-1]
     * 1, [1,n-2] -- [m-2,n-2]
     * x, [x,n-1-x] -- [m-1-x,n-1-x]
     */
    for(let b=a;b<m-a-1;b++){
      result[b][n-a-1]=head[b];
    }


    /**
     * 下
     * 0, [m-1,n-1] -- [m-1,0]
     * 1, [m-2,n-2] -- [m-2,1]
     * x, [m-x-1,n-x-1] -- [m-x-1,x]
     */
    for(let b=a;b<){}
    // 左

  }
  return result;
};

console.log(spiralMatrix(3, 5, [3, 0, 2, 6, 8, 1, 7, 9, 4, 2, 5, 5, 0]));


// 1、一排一排的填充，但要求是按螺旋顺序填充
var spiralMatrix1 = function (m, n, head) {
  let result = [];
  for (let b = 0; b < m; b++) {
    let item=[];
    for (let a = 0; a < n; a++) {
      let node=head[a+b*n];
      if(node>=0){
        item.push(node);
      } else{
        item.push(-1);
      }
    }
    result.push(item);
  }
  return result;
};

/**
 * 2、
 * 先把第0排遍历完，到最后时；遍历最后0列（第0个元素不算），到最后时，逆序遍历最后0排（第0个元素不算）；到最后时，逆序遍历第0列（第0列和最后一列不算）。这是一个循环
 * 开始第n个循环：先把第n排遍历完，到最后时；遍历倒数n列（前n个元素不算），到最后时，逆序遍历倒数n排（前n个元素不算）；到最后时，逆序遍历第n列（前n列和后n列不算）
 *
 * 一共几次循环（m是行数，n是列数）：
 *    m=1，1次
 *    m=2,1
 *    m=3,2
 *    m=4,2
 *    m=5,3
 *    m,Math.ceil(m/2)
 */





















