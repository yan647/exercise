/**
 * Created by lsq on 2020/10/18.
 */

'use strict';

function safeGet(data,str){
  let arr=str.split(".");
  let result=null;
  for(let a of arr){
    if(!result){
      result=data[a];
    } else {
      if(result[a]){
        result=result[a];
      } else return undefined;
    }
  }
  return result;
}

const safeGet1 = (o,path) =>{
  try{
    return path.split('.').reduce((pre,cur)=>pre[cur],o);
  }catch(e){
    return undefined;
  }
};
//https://blog.csdn.net/MFWSCQ/article/details/106501759



let data = {a:{b:{c:'aaa'}}};
console.log(safeGet(data,'a.b.c')); //'aaa'
console.log(safeGet(data,'a.b.c.d')); //undefined
console.log(safeGet(data,'a.b.c.d.e.f')); //undefined
