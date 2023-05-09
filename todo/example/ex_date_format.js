/**
 * Created by lsq on 2020/11/16.
 * 转换日期格式
 */

'use strict';

function changeDateFormat(date, format) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let result=format.replace(/(yyyy)(MM)(DD)(hh)(mm)(ss)/g, function (match, p1, p2, p3, p4, p5, p6) {
    if (p6) {
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if (!p4) {
      return `${year}-${month}-${day}`;
    } else if (p4 && p5) {
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }
  });
  return result;
}

let date = new Date();
console.log(changeDateFormat(date, "yyyy-MM-DD"));
// console.log(changeDateFormat(date, "yyyy-MM-DD hh:mm:ss"));
// console.log(changeDateFormat(date, "yyyy-MM-DD hh:mm"));
