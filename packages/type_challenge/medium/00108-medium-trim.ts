type Space=' ' | '\n' | '\t'
type Trim<S extends string> = S extends `${Space}${infer T}` | `${infer T}${Space}` ? Trim<T>:S

type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
