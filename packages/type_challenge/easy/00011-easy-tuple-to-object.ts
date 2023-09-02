const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type x=['tesla', 'model 3', 'model X', 'model Y']
type y=typeof tuple;

/**
 * 参考：
 * https://juejin.cn/post/7086277203662471199
 * https://juejin.cn/post/7265996663406968844#heading-11
 *
 * T[number]的作用就是获取元组所有元素对应的类型，返回一个联合类型
 * 因为使用了as const，所以得加readonly
 * */
type TupleToObject<T extends readonly any[]>={
  [P in T[number]]:P
}

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
