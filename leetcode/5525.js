/**
 * Created by lsq on 2020/9/27.
 */

'use strict';

/**
 * @param {string} kingName
 */
var ThroneInheritance = function(kingName) {
  this.kingName=kingName;
  this.people=new Map();
  this.people.set(kingName,{
    name:kingName,
    death:false,
    ifKing:true,
    parentName:null,
    children:[]
  });

};

/**
 * @param {string} parentName
 * @param {string} childName
 * @return {void}
 */
ThroneInheritance.prototype.birth = function(parentName, childName) {
  this.people.set(childName,{
    name:childName,
    death:false,
    ifKing:false,
    parentName:parentName,
    children:[]
  });
  let parent=this.people.get(parentName).children.push(childName);
};

/**
 * @param {string} name
 * @return {void}
 */
ThroneInheritance.prototype.death = function(name) {
  let someone=this.people.get(name);
  someone.death=true;
};

/**
 * @return {string[]}
 */
ThroneInheritance.prototype.getInheritanceOrder = function() {
  let that=this,curOrder=[];
  function Successor(x, curOrder){
    let xFullInfo=that.people.get(x);
    let children_len=xFullInfo.children.length;
    let inOrderNum=0,notInOrderList=[];
    for(let a of xFullInfo){
      if(curOrder.includes(a)){
        inOrderNum++;
      } else notInOrderList.push(a);
    }
    if(children_len===0 || (inOrderNum===children_len)){
      if(x===that.kingName){
        return null;
      } else return Successor(xfullInfo.parentName,curOrder);
    } else return curOrder.push(notInOrderList[0]);
  };
  return Successor(that.people.get(that.kingName).name,curOrder);
};


let kingName="king",parentName="king",childName="andy",name="king";
var obj = new ThroneInheritance(kingName)
obj.birth(parentName,childName)
obj.death(name)
var param_3 = obj.getInheritanceOrder()
