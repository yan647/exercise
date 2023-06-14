function asNumber2(val: number | string): number {
  return val as number;
}

//生成的JavaScript
function asNumber1(val) {
  return val;
}




function asNumber(val: number | string): number {
  return typeof(val) === 'string' ? Number(val) : val;
}




