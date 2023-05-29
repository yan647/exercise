function longestStrChain(words: string[]): number {
    words.sort((a,b)=>a.length-b.length)
    let result=0
    const c=new Map()
    for(const word of words){
        c.set(word,1)
        for(let i=0;i<word.length;i++){
            const prev=word.substring(0,i)+word.substring(i+1)
            if(c.has(prev)){
                c.set(word,Math.max(c.get(word),c.get(prev)+1))
            }
        }
        result=Math.max(result,c.get(word))
    }
    return result
};

console.log(longestStrChain(["a","b","ba","bca","bda","bdca"])) // 4
