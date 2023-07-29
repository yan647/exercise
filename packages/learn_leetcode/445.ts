import {ListNode, listNodeToList, listToListNode} from "./utils";

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    if (l1 || l2) {
        if (l1 && l1.next && l2 && l2.next) {
            return new ListNode(l1.val + l2.val, addTwoNumbers(l1.next, l2.next));
        } else {
            return new ListNode((l1?.val ?? 0) + (l2?.val ?? 0), addTwoNumbers(l1?.next ?? null, l2?.next ?? null));
        }
    }
    return null;
};


function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const listData1 = listNodeToList([], l1).reverse();
    const listData2 = listNodeToList([], l2).reverse();

    const list=[]
    const len1=listData1.length;
    const len2=listData2.length;
    const maxLen=Math.max(len1,len2);
    let gap=0;
    for(let a=0;a<maxLen;a++){
        const result=listData1[len1-1-a]+listData2[len2-1-a]+gap;
        if(result>=10) {
            gap=1
            list.unshift(result-10)
        } else{
            gap=0
            list.unshift(result)
        }
    }
    if(gap){
        list.push(gap);
    }
    return listToListNode(list);
};

// console.log(listNodeToList([], addTwoNumbers2(listToListNode([7, 2, 4, 3]), listToListNode([5, 6, 4]))))

// [2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,9]
//     [5,6,4,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,9,9,9,9]
console.log(listNodeToList([], addTwoNumbers2(
        listToListNode([2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 9]),
        listToListNode([5, 6, 4, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 2, 4, 3, 9, 9, 9, 9])
    )
))
