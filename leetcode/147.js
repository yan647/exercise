/**
 * Created by lsq on 2020/11/20.
 */

'use strict';
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  if (head === null) {
    return head;
  }
  const dummyHead = new ListNode(null);
  dummyHead.next = head;
  let lastSorted = head, curr = head.next;
  while (curr) {
    if (lastSorted.val <= curr.val) {
      lastSorted = lastSorted.next;
    } else {
      let prev = dummyHead;
      while (prev.next.val <= curr.val) {
        prev = prev.next;
      }
      lastSorted.next = curr.next;
      curr.next = prev.next;
      prev.next = curr;
    }
    curr = lastSorted.next;
  }
  return dummyHead.next;
};
