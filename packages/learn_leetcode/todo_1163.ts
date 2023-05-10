function lastSubstring(s: string): string {
    let i = 0
    let j = 1
    let len = s.length
    while (j < len) {
        let k = 0
        while (j + k < len && s[i + k] === s[j + k]) {
            k++;// 忽略
        }
        if (j + k < len && s[i + k] < s[j + k]) {
            let t = i
            i = j
            j = Math.max(j + 1, t + k + 1)
        } else {
            j = j + k + 1
        }
    }

    return s.substring(i, len)
};
