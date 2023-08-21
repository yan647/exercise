class ListNode {
  val: number;

  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}

/**
 * 参考 https://leetcode.cn/problems/swap-nodes-in-pairs/solutions/2374872/tu-jie-die-dai-di-gui-yi-zhang-tu-miao-d-51ap/
 * 讲解非常清晰，写法也很清晰，逻辑很顺
 * */
function swapPairs(head: ListNode | null): ListNode | null {
  const temp = new ListNode(0, head);
  let node0 = temp;
  let node1 = head;
  while (node1 && node1.next) {
    const node2 = node1.next;
    const node3 = node2.next;
    node0.next = node2;
    node2.next = node1;
    node1.next = node3;

    node0 = node1;
    node1 = node3;
  }
  return temp.next;
}
