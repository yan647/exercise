function replaceSpace(s: string): string {
  return s.replace(/\s/g, '%20')
};


function replaceSpace2(s: string): string {
  const list = s.split('')
  return list.map((item) => item === ' ' ? '%20' : item).join('')
};
