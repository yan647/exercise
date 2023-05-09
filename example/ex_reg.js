/***
 * 《JavaScript忍者秘籍》
 * 正则表达式
 * 一种查询字符串压缩技术
 */

function compress(source){
  const keys={};
  source.replace(
    /([^=&]+)=([^&]*)/g,
    function(full,key,value){//full:匹配的子串，比如foo=1,key,value括号捕获的子串，比如key=foo,value=1
      keys[key]=(keys[key]?keys[key]+',':'')+value;
      return '';
    }
  );

  const result=[];
  for(let key in keys){
    result.push(key+'='+keys[key]);
  }

  return result.join('&');
}

console.log(compress('foo=1&foo=2&blah=a&blah=b&foo=3'));
