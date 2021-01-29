/**
 * Created by lsq on 2020/10/24.
 */

'use strict';

function start(){
  console.log("request handler start was called");
}

function upload(){
  console.log("request handler upload called");
}

exports.start=start;
exports.upload=upload;
