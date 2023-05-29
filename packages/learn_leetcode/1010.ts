function numPairsDivisibleBy60(time: number[]): number {
    let result=0
    let len=time.length
    for(let i=0;i<len;i++){
        for(let j=i+1;j<len;j++){
            if((time[i]+time[j])%60===0){
                result++
            }
        }
    }
    return result
};

// console.log(numPairsDivisibleBy60([30,20,150,100,40]))// 3
console.log(numPairsDivisibleBy60([60,60,60]))

