type MyCapitalize<T extends string>=T extends `${infer R}${infer Rest}` ? `${Uppercase<R>}${infer Rest}`:T
type capitalized = MyCapitalize<'hello world'> // expected to be 'Hello world'
