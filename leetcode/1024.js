/**
 * Created by lsq on 2020/10/23.
 */

'use strict';

/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
var videoStitching = function(clips, T) {
  let dp=Array(T+1).fill(+Infinity);
  dp[0]=0;
  for(let i=1;i<=T;i++){
    for(let j=0;j<clips.length;j++){
      let left=clips[j][0],right=clips[j][1];
      if(i>left && i<=right){
        dp[i]=Math.min(dp[i],dp[left]+1);
      }
    }
  }
  return dp[T]!=+Infinity?dp[T]:-1;
};

console.log(videoStitching([[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]], 10));
