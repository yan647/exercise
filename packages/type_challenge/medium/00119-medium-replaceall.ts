// 我写的，错误的
// type ReplaceAll<S extends string, From extends string, To extends string> =
// From extends '' ? S : S extends `${infer A}${From}${infer B}` ? ReplaceAll<`${A}${To}${B}`, From, To> : S;

// 别人写的，参考https://github.com/type-challenges/type-challenges/issues/367
type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer A}${From}${infer B}` ? `${A}${To}${ReplaceAll<B, From, To>}` : S;

type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
