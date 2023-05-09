/**
 * Created by lsq on 2020/11/16.
 * 链表
 */

'use strict';
class Node{
  constructor(val) {
    this.val=val;
    this.next=null;
  }
}

let list=new Node(1);
list.next=new Node(2);
list.next.next=new Node(3);
console.log(list);
let head=list;
console.log(head);
list=list.next;
list.next=new Node(4);
console.log(head);
console.log(list);
