// 暴力解法
function isPalindrome(x: number): boolean {
    const list = String(x).split('')
    const len = list.length;
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (item !== list[len - i - 1]) {
            return false;
        }
    }
    return true;
};
console.log(isPalindrome(1211));

// 暴力解法
const isPalindrome1 = function (x: number): boolean {
    let xStr = x.toString();
    let len = xStr.length;
    if (len <= 1) {
        return true;
    }
    for (let a = 0; a < len; a++) {
        if (xStr.charAt(a) !== xStr.charAt(len - a - 1)) {
            return false;
        }
    }
    return true;
};
console.log(isPalindrome1(1122));

// 反转整个数字
function isPalindrome2(x: number): boolean {
    const str = String(x)
    const list = str.split('')
    const revertStr = list.reverse().join('')
    return str === revertStr;
}

console.log(isPalindrome2(121));

