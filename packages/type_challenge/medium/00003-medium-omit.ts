type Extend<T, U>=T extends U?T: never// 这是重点

type MyOmit<T, U extends keyof T> = {
  [u in (Extend<keyof T, U>)]: T[u]
}

interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
};
