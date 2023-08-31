// todo 太难了，抄的题解
type MyExtend<T, K> = T extends K ? never : T

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [U in K]: T[U]
} & {
  [P in MyExtend<keyof T, K>]: T[P]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
