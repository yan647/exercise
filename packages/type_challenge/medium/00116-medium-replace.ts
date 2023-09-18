type Replace<T extends string, P extends string, Q extends string>=P extends '' ? T : T extends `${infer A}${P}${infer C}` ? `${A}${Q}${C}` : T;

type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
