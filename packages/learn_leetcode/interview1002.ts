function groupAnagrams(strs: string[]): string[][] {
  let map = new Map();
  strs.map((str) => {
    let temp = str.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('');
    if (!map.get(temp)) {
      map.set(temp, [str]);
    } else {
      let origin = map.get(temp);
      origin.push(str);
      map.set(temp, origin);
    }
  });
  return [...map.values()];
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams(["eat"]));
