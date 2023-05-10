/**
 * 一. 前i本书的书架高度h[i]
 * 前i+1本书的书架高度h[i+1]=xh[i]+y
 * 现在的问题是x y分别是啥
 * 有两种情况：
 * 1. 前i+1本书在下一层，h[i+1]=h[i]+books[i][1]
 * 2. 前i+1本书跟前i本书在同一层，h[i+1]=max(h[i],books[i][1])
 *
 * 二. 怎么判断前i+1本书跟前i本书是否在同一层？
 * =判断最近一层书架的宽度+books[i+1][1]与shelfWidth的大小
 *
 * 三. 怎么判断最近一层书架的宽度？
 * 前面的同一层的书的宽度和+books[i][1]
 * 。。。
 *
 * 四. 用具体数据表示：
 * - books.length=1时，书架高度h[0]=books[i][1]，层宽=books[i][0]，最小高度=books[i][1]
 * - books.length=2时，书架高度h[i]=books[i][1]，层宽=books[i][0]，最小高度=books[i][1]。
 * i=1时，
 * if(books[0][0]<shelfWidth){
 *     if(books[0][0]+books[1][0]<shelfWidth){
 *          h[1]=Math.max(books[1][1],books[0][1])
 *     } else{
 *         h[1]=books[1][1]
 *     }
 * } else{
 *     h[1]=books[1][1]
 * }
 *
 * 看了官方的题解，发现自己设的自变量不对，还是看不太懂题解
 */
function minHeightShelves(books: number[][], shelfWidth: number): number {
    const len = books.length
    let dp = new Array(len + 1).fill(1000000)
    dp[0] = 0
    for (let i = 0; i < len; i++) {
        let maxHeight = 0, curWidth = 0;
        for (let j = i; j >= 0; j--) {
            curWidth += books[j][0]
            if (curWidth > shelfWidth) {
                break;
            }
            maxHeight = Math.max(maxHeight, books[j][1])
            dp[i + 1] = Math.min(dp[i + 1], dp[j] + maxHeight)
        }
    }
    return dp[len];
};
console.log(minHeightShelves([[1, 1], [2, 3], [2, 3], [1, 1], [1, 1], [1, 1], [1, 2]], 4))// 6






