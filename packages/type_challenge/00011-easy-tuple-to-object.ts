const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type x=['tesla', 'model 3', 'model X', 'model Y']
type y=typeof tuple;

type TupleToObject<T>={

}

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
