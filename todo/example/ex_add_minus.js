/**
 * Created by lsq on 2020/12/2.
 * 实现 (5).add(3).minus(2) 功能
 */

'use strict';

Number.prototype.add=function(data){
  return data+this.valueOf();
};
Number.prototype.minus=function(data){
  return this.valueOf()-data;
};
