declare global {
    interface Array<T> {
        last(): T | -1;
    }
}

Array.prototype.last = function () {
    const lastItem = this[this.length - 1]
    if (lastItem !== undefined) {
        return lastItem
    } else {
        return -1
    }
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */
