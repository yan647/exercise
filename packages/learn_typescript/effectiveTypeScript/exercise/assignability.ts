let source: { a: string, b: number } = {a: '1', b: 2};
let target: { a: string, b: number, c: boolean } = {a: '1', b: 2, c: true};
target = source;
source = target;

let obj:<P,X extends string,T=X>(t:T,x:X)=>{ [P in X]: T[P] } =function(t,x){
  return {
    a:t.a,
    b:t.b,
    c:3
  }}

obj({a:1,b:2},{a:'3',b:'4'})

// X
// const x={
//   a:1,
//     b:2
// }
//
// P
// // p=a,b
//
// T
// const y={a:3,b:4}
//
// T[P]
//
// y[a]
// y[b]

