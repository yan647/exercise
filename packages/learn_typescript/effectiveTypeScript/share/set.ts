


// interface A {
//   value: string;
// }
//
// interface B {
//   message: string;
// }
//
// type C = keyof (A & B); // 'value' | 'message'
// type D = keyof (A | B); // never
// type E = (keyof A) | (keyof B); // 'value' | 'message'
// type F = (keyof A) & (keyof B); // never


interface A1 {
  code: number;
  value: string;
}

interface B1 {
  code: number;
  message: string;
}

type C = keyof (A1 & B1); // 'code' | 'value' | 'message'
type D = keyof (A1 | B1); // 'code'
type E = (keyof A1) | (keyof B1); // 'code' | 'value' | 'message'
type F = (keyof A1) & (keyof B1); // 'code'

// interface A{}
// interface B {}
//
//
//
// type K = keyof (Person | Lifespan); // Type is never
// keyof (A&B) = (keyof A) | (keyof B)
// keyof (A|B) = (keyof A) & (keyof B)




