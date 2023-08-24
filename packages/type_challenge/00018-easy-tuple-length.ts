type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

/**
 * 用到了infer，感觉比我写的靠谱，但也确实让我没有想到
 * 别人的答案 https://github.com/type-challenges/type-challenges/issues/78
 * */
type Length<T extends any> = T extends { length : infer R } ? R : never;

// 我的答案
// type Length<T extends any[]>=T['length']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
