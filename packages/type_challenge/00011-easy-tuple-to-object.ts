const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type x=['tesla', 'model 3', 'model X', 'model Y']
type y=typeof tuple;

/**
 * 参考：
 * https://juejin.cn/post/7086277203662471199
 * https://juejin.cn/post/7265996663406968844#heading-11
 * */
type TupleToObject<T extends readonly any[]>={
  [P in T[number]]:P
}

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
