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
const tempList = stringToLinkedList('ABCDEFGC');
// @ts-ignore
tempList.next.next.next.next.next.next.next = tempList.next.next.next;// 人工造了个环

/**
 * 2. 构建链表，使用散列法，参考：
 * [检测链表中的循环(弗洛伊德循环检测算法)](https://www.techiedelight.com/zh/detect-cycle-linked-list-floyds-cycle-detection-algorithm/)
 * */
function getRepeatFromLinkedList(list:LinkedList | undefined):string {
  const result:string[] = [];
  let head = list;
  while (head) {
    if (!result.includes(head.val)) {
      result.push(head.val);
      head = head.next;
    } else {
      return head.val;
    }
  }
  return '-1';
}
console.log('散列法结果：', getRepeatFromLinkedList(tempList));

/**
 * 3. 使用弗洛伊德循环检测算法
 * Floyd 的循环检测算法是一种指针算法，它只使用两个指针，它们以不同的速度在序列中移动。这个想法是移动快指针的速度是慢指针的两倍，它们之间的距离每一步增加一。
 * 如果我们俩在某个时候相遇，我们在列表中找到了一个循环；否则，如果到达列表末尾，则不存在循环。它也被称为“龟兔算法”。
 * */
function getRepeatUseFloyd(list:LinkedList | undefined):string {
  let slow = list;
  let fast = list;
  while (fast && fast.next && slow) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) {
      return slow?.val ?? '-1';
    }
  }
  return '-1';
}

console.log('弗洛伊德循环检测算法结果：', getRepeatUseFloyd(tempList));

function stringToLinkedList(str:string) {
  if (!str) {
    return undefined;
  }
  const list = str.split('');
  let tail:LinkedList | undefined = new LinkedList(list[0]);
  const head = tail;
  tail.next = new LinkedList(list[1]);// 这句非常重要，不能遗漏
  tail = tail.next;
  list.forEach((item, index) => {
    if (index > 1 && tail) {
      tail.next = new LinkedList(item);
      tail = tail.next;
    }
  });
  return head;
}
