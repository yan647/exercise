function finalString(s: string): string {
  let temp:string[] = [];
  const list = s.split('');
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item === 'i') {
      temp = temp.reverse();
    } else {
      temp.push(item);
    }
  }
  return temp.join('');
}

// console.log(finalString('string'));// rtsng
console.log(finalString(''));
