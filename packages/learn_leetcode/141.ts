class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

// 方法一：双指针，弗洛伊德循环检测算法
function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        if (!slow || !slow.next) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
        if (slow && fast && slow === fast) {
            return true;
        }
    }

    return false;
};

// 方法二：哈希表
function hasCycle2(head: ListNode | null): boolean {
    let map = new Map()
    map.set(head, true);
    while (head) {
        if (map.has(head.next)) {
            return true;
        }
        if (head.next) {
            map.set(head.next, true);
        } else {
            return false;
        }
        head = head.next;
    }
    return false;
}

// 方法三：JSON.stringify在对象出现循环引用时会报错
function hasCycle3(head: ListNode | null): boolean {
    try {
        JSON.stringify(head);
        return false;
    } catch (e) {
        return true;
    }
}

// 方法四：标记法
function hasCycle4(head: ListNode | null): boolean {
    while (head) {
        if ((head as any).tag) {
            return true;
        }
        if (head) {
            (head as any).tag = true;
        } else {
            return false;
        }
        head = head.next;
    }
    return false;
}
