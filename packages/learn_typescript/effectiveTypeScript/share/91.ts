// class Test {
//   constructor(x:number){
//     this.instanceMember = x;
//   }
//   static staticMember = 1;
//   instanceMember = 2;
//   static staticMethod1(){
//   }
//   static staticMethod2(){
//     this.staticMethod1();
//   }
//   instanceMethod1(){
//   }
//   instanceMethod2(){
//     this.instanceMethod1()
//   }
// }




class Test {
  instanceMember = 1;
  instanceMethod1(){
  }
  instanceMethod2(){
  }
}
// object Test {
//   new(x:number): Test{
//   }
//   staticMethod1(){
//   }
//   staticMethod2(){
//   }
//   staticMember = 1
// }


const test = new Test()
type instanceType = typeof test; // 获取实例对象的类型即这里class Test定义的类型
type companionType = typeof Test // 获取伴生对象的类型即这里的object Test定义的类型
type cc = InstanceType<companionType> // 根据伴生类型推倒实例类型
