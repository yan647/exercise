/**
 * Created by lsq on 2020/11/16.
 * 参考 https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/solution/javascript-di-gui-die-dai-3-jie-fa-xiang-jin-zhu-4/
 */

'use strict';

function ListNode(val) {
  this.val = val;
  this.next = null;
}

//循环
var mergeTwoLists = function (l1, l2) {
  let newList = new ListNode(null);
  let head = newList;
  while (l1 && l2) {
    if (l1.val > l2.val) {
      newList.next = l2;
      l2 = l2.next;
    } else if (l1.val <= l2.val) {
      newList.next = l1;
      l1 = l1.next;
    }
    newList.next.next = null;
    newList = newList.next;
  }
  newList.next = l1 || l2;
  return head.next;
};
