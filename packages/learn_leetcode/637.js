/**
 * Created by lsq on 2020/9/12.
 */

'use strict';

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {
  let temp=0,num=0,result=[],newNodeList=[];
  root.val!=undefined && result.push(parseInt(root.val));
  root.left && newNodeList.push(root.left);
  root.right && newNodeList.push(root.right);
  if(newNodeList.length){
    return fun(newNodeList,result,1);
  } else return result;
};

function fun(nodeList,result,level){
  let temp=0,num=0,newNodeList=[];
  for(let a=0;a<nodeList.length;a++){
    let node=nodeList[a];
    if(node.val!==undefined){
      if(temp){
        temp+=node.val;
      } else temp=node.val;
      num++;
      node.left && newNodeList.push(node.left);
      node.right && newNodeList.push(node.right);
    }
  }
  result.push(temp/num);
  if(newNodeList.length){
    return fun(newNodeList,result,++level);
  } else return result;
}
