// declare global {
//     interface Array<T> {
//         groupBy(fn: (item: T) => string): Record<string, T[]>
//     }
// }

(Array.prototype as any).groupBy = function(fn) {
    let result={}
    this.forEach((item)=>{
        const cal=fn(item)
        if(result[cal]){
            result[cal].push(item)
        } else {
            result[cal]=[item]
        }
    })
    return result
}
const fn=function (list) { return String(list[0]); }

console.log(([[1, 2, 3],[1, 3, 5], [1, 5, 9]] as any).groupBy(fn))
