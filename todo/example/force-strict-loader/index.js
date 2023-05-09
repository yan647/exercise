/**
 * Created by lsq on 2020/11/3.
 * 参考webpack实战 入门、进阶与调优 P79
 */

'use strict';
const loaderUtils=require("loader-utils");
const SourceNode=require("source-map").SourceNode;
const SourceMapConsumer=require("source-map").SourceMapConsumer();

module.exports = function (content,sourceMap) {
  this.cacheable && this.cacheable();//如果有缓存则用缓存
  const options=loaderUtils.getOptions(this) || {};
  let useStrict="'use strict';\n\n";

  //source map
  if(options.sourceMap && sourceMap){
    const currentRequest=loaderUtils.getCurrentRequest(this);
    let node=SourceNode.fromStringWithSourceMap(content,new SourceMapConsumer(sourceMap));
    node.prepend(useStrict);
    let result=node.toStringWithSourceMap({file:currentRequest});
    let callback=this.async();
    callback(null,result.code,result.map.toJSON());
  }
  return  useStrict+ content;
};


