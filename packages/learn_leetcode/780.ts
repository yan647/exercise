/**
 * Created by lsq on 2022/4/9.
 */

'use strict';

// 反向计算
function reachingPoints(sx: number, sy: number, tx: number, ty: number): boolean {
  while (sx < tx && sy < ty && tx !== ty) {
    if (tx > ty) {
      tx %= ty;
    } else {
      ty %= tx;
    }
  }
  if (tx === sx && ty === sy) {
    return true;
  } else if (tx === sx) {
    return ty > sy && (ty - sy) % sx === 0;
  } else if (ty === sy) {
    return tx > sx && (tx - sx) % sy === 0;
  } else {
    return false;
  }
}

console.log(reachingPoints(1, 1, 3, 5));
console.log(reachingPoints(1, 1, 2, 2));
console.log(reachingPoints(1, 1, 1, 1));

// 辗转相除法
function reachingPoints1(sx: number, sy: number, tx: number, ty: number): boolean {
  if (tx < sx || ty < sy) {
    return false;
  } else {
    if (tx > ty) {
      if (ty === sy) {
        return sx >= (tx % ty) && (tx - sx) % sy === 0;
      } else return reachingPoints1(sx, sy, tx % ty, ty);
    } else if (tx < ty) {
      if (tx === sx) {
        return sy >= (ty % tx) && (ty - sy) % tx === 0;
      } else return reachingPoints1(sx, sy, tx, ty % tx);
    } else return tx === sx && ty === sy;
  }
}

console.log(reachingPoints1(1, 1, 3, 5));
console.log(reachingPoints1(1, 1, 2, 2));
console.log(reachingPoints1(1, 1, 1, 1));
