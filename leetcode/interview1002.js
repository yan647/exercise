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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function groupAnagrams(strs) {
    var map = new Map();
    strs.map(function (str) {
        var temp = str.split('').sort(function (a, b) { return a.charCodeAt(0) - b.charCodeAt(0); }).join('');
        if (!map.get(temp)) {
            map.set(temp, [str]);
        }
        else {
            var origin_1 = map.get(temp);
            origin_1.push(str);
            map.set(temp, origin_1);
        }
    });
    return __spread(map.values());
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams(["eat"]));
