/**
 * 参考：https://juejin.cn/post/7119670034330288136
 */

type Includes<T extends any[], U>=U extends T[number]? true: false;// todo 未完成

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
type a=Includes<[boolean, 2, 3, 5, 6, 7], false>
