// 2022.07.03 周赛题

//1
/**
 * @param {string} key
 * @param {string} message
 * @return {string}
 */
var decodeMessage = function (key, message) {
  let list = key.split('');
  let map = list.entries();
  let index = 0;
  list.forEach((item) => {
    if (item !== ' ' && !map[item]) {
      map[item] = String.fromCharCode(index + 97);
      index++;
    }
  })
  map[' '] = ' ';
  let msgList = message.split('');
  return msgList.map((item) => {
    return map[item];
  }).join('');
};

console.log(decodeMessage("the quick brown fox jumps over the lazy dog","vkbs bs t suepuv"));

// console.log(decodeMessage("d","d"));
