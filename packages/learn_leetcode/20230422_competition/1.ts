function supplyWagon(supplies: number[]): number[] {
    const targetLen = parseInt(String(supplies.length / 2))
    let curLen = supplies.length
    while (curLen > targetLen) {
        let sumTwo: number[] = []
        let len = supplies.length
        supplies.forEach((item, index) => {
            if (index < len-1) {
                sumTwo.push(item + supplies[index + 1])
            }
        })
        const {minIndex, minNum} = findMin(sumTwo)
        supplies.splice(minIndex, 1)
        supplies[minIndex] = minNum
        curLen = supplies.length
    }
    return supplies
};

function findMin(list: number[]): { minIndex: number, minNum: number } {
    let minIndex = 0;
    let minNum = 0;
    let newList = Object.entries(list)
    newList = newList.sort((a, b) => a[1] - b[1])
    return {minIndex: Number(newList[0][0]), minNum: newList[0][1]}
}

console.log(supplyWagon([1,3,1,5]))
