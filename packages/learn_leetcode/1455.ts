/**
 * Created by lsq on 2022/8/21.
 */

'use strict';

function isPrefixOfWord(sentence: string, searchWord: string): number {
    const list=sentence.split(' ');
    const searchWordLen=searchWord.length;
    for(let i in list){
        if(list[i].substr(0,searchWordLen)===searchWord){
            return Number(i)+1;
        }
    }
    return -1;
}

console.log(isPrefixOfWord("i love eating burger","burg"));
console.log(isPrefixOfWord("this problem is an easy problem","pro"));
console.log(isPrefixOfWord("i love eating aaaburg","burg"));
