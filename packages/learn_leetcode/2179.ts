// 官网解法：树状数组
class FenwickTree {
    private tree: number[]

    constructor(n: number) {
        this.tree = new Array(n + 1).fill(0);
    }

    query(i: number): number {
        i++
        let result = 0
        while (i > 0) {
            result += this.tree[i]
            i -= i & -i
        }
        return result
    }

    update(n: number, delta: number) {
        n++
        while (n < this.tree.length) {
            this.tree[n] += delta
            n += n & -n
        }
    }
}

function goodTriplets(nums1: number[], nums2: number[]): number {
    const len = nums1.length
    const pos2 = new Array(len)
    const reversedIndexMapping = new Array(len)
    for (let i = 0; i < len; i++) {
        pos2[nums2[i]] = i
    }
    for (let i = 0; i < len; i++) {
        reversedIndexMapping[pos2[nums1[i]]] = i
    }
    const tree = new FenwickTree(len)
    let result = 0
    for (let i = 0; i < len; i++) {
        const pos = reversedIndexMapping[i]
        const left = tree.query(pos)
        tree.update(pos, 1)
        const right = (len - 1 - pos) - (i - left)
        result += left * right
    }
    return result
};
console.log(goodTriplets([2, 0, 1, 3], [0, 1, 2, 3]))
console.log(goodTriplets([4, 0, 1, 3, 2], [4, 1, 0, 2, 3]))
