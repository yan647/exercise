const isPalindrome1 = function (x:number) {
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

//https://leetcode-cn.com/problems/palindrome-number/solution/hui-wen-shu-by-leetcode-solution/
const isPalindrome2 = function (x:number) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) {
        return false;
    } else {
        let a = 0;
        while (x > a) {
            a = a * 10 + x % 10;
            x = Math.floor(x / 10);
        }
    }
};
console.log(isPalindrome2(1122));


function isPalindrome(x: number): boolean {
    const list=String(x).split('')
    const len = list.length;
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if(item!==list[len-i-1]){
            return false;
        }
    }
    return true;
};

console.log(isPalindrome(1211));