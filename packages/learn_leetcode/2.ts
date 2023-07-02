import {listToListNode, ListNode, listNodeToList} from './utils';

// 我自己想的方法，不太对
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let result: ListNode | null = null;
    if (l1 && l2) {
        const list1: number[] = listNodeToList([], l1);
        const list2: number[] = listNodeToList([], l2);
        const len1 = list1.length;
        const len2 = list2.length;
        const maxLen = Math.max(len1, len2);
        let resultList = []
        let gap = 0;
        for (let a = 0; a < maxLen; a++) {
            const tempResult = (list1[len1 - a - 1] || 0) + (list2[len2 - a - 1] || 0) + gap;
            if (tempResult >= 10) {
                gap = 1;
                resultList.unshift(tempResult - 10);
            } else {
                gap = 0;
                resultList.unshift(tempResult);
            }
        }
        if (gap) {
            resultList.unshift(gap)
        }
        result = listToListNode(resultList);
    }
    return result;
};


// console.log(listNodeToList([],addTwoNumbers(listToListNode([2,4,3]), listToListNode([5,6,4]))));// [7,0,8]
// console.log(listNodeToList([], addTwoNumbers(listToListNode([9, 9, 9, 9, 9, 9, 9]), listToListNode([9, 9, 9, 9]))));//[8,9,9,9,0,0,0,1]
console.log(listNodeToList([], addTwoNumbers(listToListNode([2, 4, 9]), listToListNode([5, 6, 4, 9]))));//[7,0,4,0,1]

