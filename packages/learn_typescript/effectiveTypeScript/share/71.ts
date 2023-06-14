// const mixed = ['x',1]

// // 使用方式三
// function test2(a:'x',b:1){
//
// }
// test2(...mixed)//['x',1] 更合理


// const mixed = ['x',1]
// //使用方式一
// mixed.push(1);//(string|number)[] 更为合理


const mixed = ['x',1]
// 使用方式二
function test2(a:string,b:number){

}
test2(...mixed)//[string,number] 更为合理
