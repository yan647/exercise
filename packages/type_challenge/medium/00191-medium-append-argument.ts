// 我想岔了，这是按正确答案改的
type AppendArgument<Fn, A> = Fn extends (...args: infer P) => infer T ? (...args: [...P, A]) => T : never;

type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean>
// expected be (a: number, b: string, x: boolean) => number
