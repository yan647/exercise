function sortPeople(names: string[], heights: number[]): string[] {
    let list: Array<{
        name: string,
        height: number,
    }> = []
    names.forEach((item, index) => {
        list.push({
            name: item,
            height: heights[index]
        })
    })

    return list.sort((a, b) => (b.height - a.height)).map((item) => item.name)
};

// console.log(sortPeople(["Mary","John","Emma"], [180,165,170]))

function sortPeople2(names: string[], heights: number[]): string[] {
    for (let j = 0; j < names.length - 1; j++) {
        for (let i = 0; i < names.length - 1; i++) {
            if (heights[i + 1] > heights[i]) {
                let tempHeight = heights[i + 1]
                let tempName = names[i + 1]
                heights[i + 1] = heights[i]
                names[i + 1] = names[i]
                heights[i] = tempHeight
                names[i] = tempName
            }
        }
        console.log(names)
    }
    return names
}

// console.log(sortPeople2(["Mary", "John", "Emma"], [180, 165, 170]))
// console.log(sortPeople2(["Alice", "Bob", "Bob"], [155, 185, 150]))
console.log(sortPeople2(["IEO","Sgizfdfrims","QTASHKQ","Vk","RPJOFYZUBFSIYp","EPCFFt","VOYGWWNCf","WSpmqvb"],
    [17233,32521,14087,42738,46669,65662,43204,8224]))
