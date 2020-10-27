/**
 * Created by lsq on 2020/10/27.
 */

'use strict';

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal1 = function(root) {
  let result=[];
  function fun(root){
    if(root===null){
      return;
    } else {
      result.push(root.val);
      fun(root.left);
      fun(root.right);
    }
  }
  fun(root);
  return result;
};

var preorderTraversal2 = function(root) {
  let result=[];
  function fun(root){
    if(root===null){
      return;
    } else {
      result.push(root.val);
      fun(root.left);
      fun(root.right);
    }
  }
  fun(root);
  return result;
};


