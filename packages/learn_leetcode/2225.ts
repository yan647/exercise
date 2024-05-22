// 方法一，最麻烦的方法
function findWinners1(matches: number[][]): number[][] {
    let obj:Record<number,number>={}
    for(let i=0;i<matches.length;i++){
        if(obj[matches[i][1]]){
            obj[matches[i][1]]++
        } else{
            obj[matches[i][1]]=1
        }
    }
    return [
        Object.entries(obj).filter(([_key,value])=>Number(value)===0).map((item)=>Number(item[0])),
        Object.entries(obj).filter(([_key,value])=>Number(value)===1).map((item)=>Number(item[0]))
    ]
};