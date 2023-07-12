import cloneDeep from 'lodash/cloneDeep';
/**
 * 循环链表找环的方法
 * 1. 最简单的方法
 * @param str
 * @returns {string|T}
 */
function getRepeat(str:string):string {
  const arr = str.split('').sort();
  for (let a = 0; a < arr.length - 1; a++) {
    if (arr[a] === arr[a + 1]) {
      return arr[a];
    } if (a === arr.length - 2) {
      return '0';
    }
  }
  return '-1';
}

console.log('方法一结果：', getRepeat('ABCDEFGC'));

/**
 * 链表，构建、遍历都需要用一头一尾双指针
 */
class LinkedList {
  val:string;

  next:LinkedList | undefined;

  constructor(val:string, next?:LinkedList | undefined) {
    this.val = val;
    this.next = next;
  }
}
/**
 * 2. 构建链表，使用散列法，参考：
 * [检测链表中的循环(弗洛伊德循环检测算法)](https://www.techiedelight.com/zh/detect-cycle-linked-list-floyds-cycle-detection-algorithm/)
 * */
function getRepeatFromLinkedList(list:LinkedList | undefined):string {
  const result:string[] = [];
  let head = list;
  while (head) {
    if (result.includes(head.val)) {
      result.push(head.val);
    } else {
      return head.val;
    }
    head = head.next;
  }
  return '-1';
}

function stringToLinkedList(str:string) {
  if (!str) {
    return undefined;
  }
  const list = str.split('');
  // let tail:LinkedList | undefined = new LinkedList(list[0]);
  let tail:LinkedList | undefined = new LinkedList(list[0]);
  const head = cloneDeep(tail);
  tail = tail.next;
  list.forEach((item, index) => {
    if (index && tail) {
      tail.next = new LinkedList(item);
      tail = tail.next;
    }
  });
  return head;
}

console.log('散列法结果：', getRepeatFromLinkedList(stringToLinkedList('ABCDEFGC')));
