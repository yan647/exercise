function removeStars(s: string): string {
  const list = s.split('');
  const result = [];
  for (let a = 0; a < list.length; a++) {
    if (list[a] !== '*') {
      result.push(list[a]);
    } else {
      result.pop();
    }
  }
  return result.join('');
}

console.log(removeStars('leet**cod*e'));
console.log(removeStars('erase*****'));
