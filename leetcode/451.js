/**
 * Created by lsq on 2021/7/3.
 */
'use strict';
function frequencySort(s) {
    var strList = s.split('');
    var obj = {};
    strList.map(function (_str) {
        if (obj[_str]) {
            obj[_str]++;
        }
        else
            obj[_str] = 1;
    });
    var list = Object.entries(obj);
    list = list.sort(function (a, b) {
        return Number(b[1]) - Number(a[1]);
    });
    var resultStr = '';
    for (var a = 0; a < list.length; a++) {
        for (var b = 0; b < Number(list[a][1]); b++) {
            resultStr = resultStr + list[a][0];
        }
    }
    return resultStr;
}
console.log(frequencySort('tree'));
console.log(frequencySort('cccaaa'));
console.log(frequencySort("Aabb"));
