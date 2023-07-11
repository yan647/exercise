export class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

export function listToListNode(numberList: number[]): null | ListNode {
  let result: ListNode | null = null;
  numberList.forEach((item) => {
    result = addItemNode(item, result);
  });
  return result;
}

export function listNodeToList(list: number[], listNode: ListNode | null) {
  if (listNode) {
    list.push(listNode.val);
    listNodeToList(list, listNode.next);
  }
  return list;
}

function addItemNode(item: number, listNode: ListNode | null) {
  let temp = listNode;
  if (listNode) {
    temp = {
      val: item,
      next: listNode,
    };
  } else {
    temp = {
      val: item,
      next: null,
    };
  }
  return temp;
}
