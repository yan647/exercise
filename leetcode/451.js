/**
 * Created by lsq on 2021/7/3.
 */
'use strict';
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
//桶排序
function frequencySort1(s) {
    var e_1, _a, e_2, _b;
    var map = new Map();
    var strList = s.split('');
    var maxFreq = 0;
    for (var a = 0; a < strList.length; a++) {
        var freq = (map.get(strList[a]) || 0) + 1;
        map.set(strList[a], freq);
        maxFreq = Math.max(maxFreq, freq);
    }
    var bucket = new Array(maxFreq + 1).fill(0).map(function (_item) { return []; });
    try {
        for (var _c = __values(map.entries()), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), key = _e[0], num = _e[1];
            bucket[num].push(key);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var result = '';
    for (var a = maxFreq; a > 0; a--) {
        try {
            for (var _f = (e_2 = void 0, __values(bucket[a])), _g = _f.next(); !_g.done; _g = _f.next()) {
                var ch = _g.value;
                for (var b = 0; b < a; b++) {
                    result += ch;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f["return"])) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return result;
}
console.log(frequencySort1('tree'));
console.log(frequencySort1('cccaaa'));
console.log(frequencySort1("Aabb"));
