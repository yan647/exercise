interface TypeA {
  a: string,
}

interface TypeB  extends  TypeA {
  b: string
}

function func<T1 extends TypeA = TypeB>(t1: T1): T1 {
  t1.a
  t1.b
  return t1;
}
let A:TypeA={a:'11'};
let B={a:'11',b:'22',c:'cc'};
func(A);

func(B);


function func2<T1 extends TypeA>(t1: T1): T1 {
  t1.a
  t1.b
  return t1;
}

func2({a:'11'});

func2({a:'1',b:'2'});

//https://stackoverflow.com/questions/56843790/typescript-generic-type-with-equal-operator-means
declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(element: T, children: U[]): Container<T, U[]>;

declare function create<T extends HTMLElement = HTMLDivElement, U = T[]>(element?: T, children?: U): Container<T, U>;
