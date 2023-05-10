/**
 * Created by lsq on 2020/10/3.
 */

'use strict';

/**
 * @param {string[]} keyName
 * @param {string[]} keyTime
 * @return {string[]}
 */
var alertNames = function(keyName, keyTime) {
  let name_time_list={};
  for(let a=0;a<keyName.length;a++){
    if(name_time_list[keyName[a]]){
      name_time_list[keyName[a]].push(keyTime[a]);
    } else name_time_list[keyName[a]]=[keyTime[a]];
  }
  let result=[];
  for(let a in name_time_list){
    let _data=name_time_list[a];
    if(_data.length>=3){
      _data=_data.sort((x,y)=>{
        let xList=x.split(":"),yList=y.split(":");
        if(parseInt(xList[0])<parseInt(yList[0])){
          if(parseInt(xList[1])<parseInt(yList[1])){
            return true;
          } else return false;
        } else return false;
      });
      for(let b=0;b<=_data.length-3;b++){
        if(ifGapOne(_data[b],_data[2+b])){
          result.push(a);
          break;
        }
      }
    }
  }
  return result.sort();
};

function ifGapOne(a,b){
  let aList=a.split(":"),bList=b.split(":");
  if(bList[0]=="23" && aList[0]=="00"){
    return false;
  } else if(bList[0]==aList[0]){
    return true;
  } else if(parseInt(bList[0])==parseInt(aList[0])+1 && (parseInt(bList[1])+parseInt(aList[1])>60 || (bList[1]=="00" && aList[1]=="00") ) ){
    return true;
  }
  return false;

}

console.log(alertNames(["a","a","a","a","a","b","b","b","b","b","b"],["04:48","23:53","06:36","07:45","12:16","00:52","10:59","17:16","00:36","01:26","22:42"]));
