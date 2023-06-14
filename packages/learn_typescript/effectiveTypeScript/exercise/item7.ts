/***
 * 基本类型
 */
let x: never; // never 类型，对应空集 {}
let x1: never = 12; // 报错，因为空集不包含 12

type A = 'A'; // 单值集合 {'A'}
type B = 'B'; // 单值集合 {'B'}
type Twelve = 12; // 单值集合 {12}

type AB = 'A' | 'B'; // 集合 {'A','B'}，也可以看成是 {'A'} 和 {'B'} 的并集
type A_B = 'A' & 'B'; // never 类型，对应空集 {}，也可以看成是 {'A'} 和 {'B'} 的交集
type AB12 = 'A' | 'B' | 12; // 集合 {'A','B',12}

const a: AB = 'A'; // {'A'} 是 {'A','B'} 的子集
const c: AB = 'C'; // 报错，因为 {'C'} 不是 {'A','B'} 的子集
const ab: AB = Math.random() < 0.5 ? 'A' : 'B'; // {'A','B'} 是 {'A','B'} 的子集
const ab12: AB12 = ab; // {"A", "B"} 是 {"A", "B", 12} 的子集

declare let twelve: AB12;
const back: AB = twelve;// 报错，{"A", "B", 12} 不是 {"A", "B"} 的子集


/***
 * 对象类型
 */
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;

const ps0: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
}; // OK

const ps01: PersonSpan = {// 报错，因为Person不是PersonSpan的子集
  name: 'Alan Turing',
  // birth: new Date('1912/06/23'),
  // death: new Date('1954/06/07'),
};

const ps02: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
  example:true,//多余属性检查
};

type PersonSpan2 = Person | Lifespan;

const ps21: PersonSpan2 = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
};
const ps22: PersonSpan2 = {// 正确，因为Person是PersonSpan2的子集
  name: 'Alan Turing',
  // birth: new Date('1912/06/23'),
  // death: new Date('1954/06/07'),
};

type K = keyof (Person | Lifespan); // Type is never

interface Vector1D { x: number; }
interface Vector2D { x: number; y: number; }
interface Vector3D { x: number; y: number; z: number; }

const v1= {x:1,y:2,z:3};
const v2:Vector2D=v1;
const v3={x:1};
const v4:Vector2D=v3;


