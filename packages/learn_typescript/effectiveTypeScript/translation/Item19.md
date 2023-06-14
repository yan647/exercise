# Item19 避免使用可推断类型混淆你的代码

许多新手TypeScript开发者在转换JavaScript代码库时做的第一件事就是用类型注释填充代码库。TypeScript毕竟是关于类型的。但是在TypeScript中，许多注释是没必要的。为所有变量定义类型是适得其反而且被认为是糟糕的风格。

不要写：

```TypeScript
let x: number = 12;
```

相反，你只需要写：

```TypeScript
let x = 12;
```

如果在你的编辑器中把鼠标放到x上，你会看到它的类型被推断为number。

显示类型注释是多余的。写它只为增加噪音。如果你不确定类型，你可以在你的编辑器中检查它。

TypeScript也会推断复杂对象的类型：

```TypeScript
const person: {
  name: string;
  born: {
    where: string;
    when: string;
  };
  died: {
    where: string;
    when: string;
  }
} = {
  name: 'Sojourner Truth',
  born: {
    where: 'Swartekill, NY',
    when: 'c.1797',
  },
  died: {
    where: 'Battle Creek, MI',
    when: 'Nov. 26, 1883'
  }
};
```

你可以写：

```TypeScript
const person = {
  name: 'Sojourner Truth',
  born: {
    where: 'Swartekill, NY',
    when: 'c.1797',
  },
  died: {
    where: 'Battle Creek, MI',
    when: 'Nov. 26, 1883'
  }
};
```

同样，类型完全是一样的。写除了值之外的类型只是增加噪音（Item21有关于推断对象文本类型的更多说明）。

对象适用的情况对数组也适用。基于输入和操作，TypeScript能轻易的推断这个函数的返回类型：

```TypeScript
function square(nums: number[]) {
  return nums.map(x => x * x);
}
const squares = square([1, 2, 3, 4]); // Type is number[]
```

TypeScript的推断可能比你想象的还精确。这通常是个好事。比如：

```TypeScript
const axis1: string = 'x';  // Type is string
const axis2 = 'y';  // Type is "y"
```

y是axis变量更精确的类型。Item21提供了个关于如何修复类型错误的例子。

允许类型被推断可以促进重构。假设你有一个Product类型，一个函数可以打印它：

```TypeScript
interface Product {
  id: number;
  name: string;
  price: number;
}

function logProduct(product: Product) {
  const id: number = product.id;
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}
```

某些时候，你了解到产品IDs除了数字之外还可能包含字母。 所以在Product中你改变了id的类型。在logProduct上，由于你添加了对所有变量显示的注释，因此会产生一个错误：

```TypeScript
interface Product {
  id: string;
  name: string;
  price: number;
}

function logProduct(product: Product) {
  const id: number = product.id;
     // ~~ Type 'string' is not assignable to type 'number'
  const name: string = product.name;
  const price: number = product.price;
  console.log(id, name, price);
}
```

如果你在logProduct函数体中省略了所有注释，代码会通过类型检查器而不需要修改。

一个更好的logProduct实现是使用解构赋值（Item58）。

```TypeScript
function logProduct(product: Product) {
  const {id, name, price} = product;
  console.log(id, name, price);
}
```

这个版本允许推断所有局部变量的类型。使用显式类型注释的版本是重复和混乱的：

```TypeScript
function logProduct(product: Product) {
  const {id, name, price}: {id: string; name: string; price: number } = product;
  console.log(id, name, price);
}
```

在TypeScript没有足够的上下文推断类型的情况下，仍然需要显式类型注释。你已经在前面见过：函数参数。

一些语言会基于他们最后的使用来的推断参数的类型，但TypeScript不是。在TypeScript中，一个变量的类型通常在它第一次被引入时确定的。

