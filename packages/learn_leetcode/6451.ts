/**
 * 找最大的数，num这里肯定是+1，x这里肯定是-1，x=num+2*t
 * */
function theMaximumAchievableX(num: number, t: number): number {
  return num + 2 * t;
}

console.log(theMaximumAchievableX(4, 1));// x=6 num+1=x-1,x=num+1+1
console.log(theMaximumAchievableX(1, 3));// num=1,t=3,  num-3=x+3,x=1-6=-5    num+3=x-3,x=7
