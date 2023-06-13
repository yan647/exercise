function reverseLeftWords(s: string, n: number): string {
  const delStr = s.substring(0, n)
  return s.replace(delStr, '') + delStr
};
