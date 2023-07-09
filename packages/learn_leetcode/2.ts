import { listToListNode, ListNode, listNodeToList } from './utils';

// 我自己想的方法，不太对
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let result: ListNode | null = null;
  if (l1 && l2) {
    const list1: number[] = listNodeToList([], l1);
    const list2: number[] = listNodeToList([], l2);
    const len1 = list1.length;
    const len2 = list2.length;
    const maxLen = Math.max(len1, len2);
    const resultList = [];
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
      resultList.unshift(gap);
    }
    result = listToListNode(resultList);
  }
  return result;
}

// 学习官方题解
function addTwoNumbers2(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let tempL1 = l1;
  let tempL2 = l2;

  /**
   * 这里如果只有head，没有tail，节点的next就会被覆盖，而不是正确的链表了
   * 所以这里很关键，需要定义一头一尾两个指针，保证尾指针一直指向链表尾，头指针一直指向链表头
   * */
  let head = null;
  let tail = null;
  let gap = 0;
  while (tempL1 || tempL2) {
    const num1 = tempL1?.val ?? 0;
    const num2 = tempL2?.val ?? 0;
    const sum = num1 + num2 + gap;
    if (!head && !tail) {
      // 最开始，什么都没有，新加一个节点，这个节点既是头也是尾
      tail = new ListNode(sum % 10);
      head = tail;
    } else {
      (tail as ListNode).next = new ListNode(sum % 10);

      // 把尾指针挪到链表尾部，保障tail永远指向链表尾部，而这时的head还是指向链表头部
      tail = (tail as unknown as ListNode).next;
    }
    gap = Math.floor(sum / 10);
    if (tempL1) {
      tempL1 = tempL1.next;
    }
    if (tempL2) {
      tempL2 = tempL2.next;
    }
  }
  if (gap) {
    // 如果算到最后，还有进位，就加到链表结尾
    (tail as ListNode).next = new ListNode(gap);
  }
  return head;
}

// console.log(listNodeToList([],addTwoNumbers(listToListNode([2,4,3]), listToListNode([5,6,4]))));// [7,0,8]

// console.log(listNodeToList([], addTwoNumbers(
//   listToListNode([9, 9, 9, 9, 9, 9, 9]),
//   listToListNode([9, 9, 9, 9]),
// )));// [8,9,9,9,0,0,0,1]

console.log(listNodeToList(
  [],
  addTwoNumbers(listToListNode([2, 4, 9]), listToListNode([5, 6, 4, 9])),
));// [7,0,4,0,1]
