# Item 4 熟悉结构类型

JavaScript本质上是鸭子类型的：如果你传递一个有所有正确属性的值给一个函数，它不关心你是如何创建这个值的。它只会使用它（如果它走路像鸭子，说起话来像鸭子。。。）。TypeScript模拟了这种行为，它有时会导致一些令人惊讶的结果，因为类型检查器对类型的了解可能比你想像的更广泛。对结构类型有较好的了解会帮助你理解错误和非错误，并帮助你写出更健壮的代码。

假设你在一家物理图书馆工作，而且有一个2D矢量类型：

```TypeScript
interface Vector2D {
  x: number;
  y: number;
}
```

你写了个函数计算它的长度：

```TypeScript
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

```

现在我们来介绍一个命名矢量的概念：

```TypeScript
interface NamedVector {
  name: string;
  x: number;
  y: number;
}
```

calculateLength函数将使用NamedVector，因为他们有x和y属性，都是number。TypeScript足够聪明，能够解决这个问题：

```TypeScript
const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
calculateLength(v);  // OK, result is 5
```

有趣的是，你从没有声明Vector2D和NamedVector的关系。而且不必为NamedVector写calculateLength的替代实现。TypeScript的类型系统模拟JavaScript的运行时行为（Item 1）。它允许NamedVector调用calculateLength，因为它的结构与Vector2D兼容。这就是术语"结构类型"的来源。

但是这也会带来麻烦。假设你添加了一个3D矢量类型：

```TypeScript
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
```

然后写一个函数初始化他们（让它们的长度为1）：

```TypeScript
function normalize(v: Vector3D) {
  const length = calculateLength(v);
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}
```

如果你调用这个函数，你可能会得到比单位长度更长的东西：

```
> normalize({x: 3, y: 4, z: 5})
{ x: 0.6, y: 0.8, z: 1 }
```

那么哪里出错了，为什么TypeScript没有捕获错误？

bug是calculateLength对2D向量进行操作，而normalize对3D向量进行操作。所以z分量在初始化时被忽略了。

也许更令人惊讶的是类型检查器没有捕获这个问题。为什么允许用3D向量调用calculateLength，尽管它的类型声明提示它需要2D向量？

对于命名向量来说，起到了如此好的作用，但在这里却适得其反。使用{x,y,z}对象调用calculateLength不会抛出错误。所以类型检查器也没有提示，而且这个行为导致了bug。（如果你希望这是个错误，你有一些选项。我们将在Item 37回这个例子。）

当你写函数时，很容易想象，使用具有你声明的属性而没有其他属性的参数，来调用它们。这种类型被称为"sealed" 或者"precise"类型，它们不能在TypeScript类型系统中表示。无论你是否喜欢，你的类型是"开放的"。

有时这会带来惊喜：

```TypeScript
function calculateLengthL1(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
               // ~~~~~~~ Element implicitly has an 'any' type because ...
               //         'string' can't be used to index type 'Vector3D'
    length += Math.abs(coord);
  }
  return length;
}
```

为什么这是个错误？因为axis是v的一个key，它可能是x,y或者z，v是个Vector3D。根据Vector3D的定义，这些都是number，所以coord的类型不应该是number吗?

这个错误是假阳性的吗？不，TypeScript做了正确的提示。前面段落的逻辑假设Vector3D是密闭的，而且没有其他属性。但它可以：

```TypeScript
const vec3D = {x: 3, y: 4, z: 1, address: '123 Broadway'};
calculateLengthL1(vec3D);  // OK, returns NaN
```

因为v可能有任何属性，axis的类型是string。TypeScript没有理由相信v[axis]是一个数字，如你所见，它可能不是。在对象迭代上可能很难让类型变正确。我们将在Item 54回到这个主题，但是在这个例子中，没有循环的实现会更好：

```TypeScript
function calculateLengthL1(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}
```

class在结构上是可分配的，使用class的结构类型也可能导致意外：

```TypeScript
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

const c = new C('instance of C');
const d: C = { foo: 'object literal' };  // OK!
```

为什么d被分配给C？它有一个foo属性，是个string类型。另外，它还有一个构造函数（来自Object.prototype），可以用一个参数调用该构造函数（尽管经常使用零参数调用该构造函数）。所以这些结构是匹配的。如果C的构造器里有逻辑，而且写了个假设可以运行的函数，那么这可能导致意外。这与C++和Java完全不同，在这些语言中，声明C类型的参数，可以保证它是C或者C的一个子类。

当你在写测试时，结构类型是有益的。假设你有一个执行数据库查询并处理结果的函数：

```TypeScript
interface Author {
  first: string;
  last: string;
}
function getAuthors(database: PostgresDB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```

为了测试这一点，你可以创建一个模拟PostgresDB。但是更好的方法是使用结构类型并定义一个更窄的接口：

```TypeScript
interface DB {
  runQuery: (sql: string) => any[];
}
function getAuthors(database: DB): Author[] {
  const authorRows = database.runQuery(`SELECT FIRST, LAST FROM AUTHORS`);
  return authorRows.map(row => ({first: row[0], last: row[1]}));
}
```

在生产环境你仍然可以传递给getAuthors一个PostgresDB，因为它有runQuery方法。由于结构类型，PostgresDB不需要实现DB。TypeScript将会发现这点。

当你编写你的测试时，你可以传入一个简单的结构：

```TypeScript
test('getAuthors', () => {
  const authors = getAuthors({
    runQuery(sql: string) {
      return [['Toni', 'Morrison'], ['Maya', 'Angelou']];
    }
  });
  expect(authors).toEqual([
    {first: 'Toni', last: 'Morrison'},
    {first: 'Maya', last: 'Angelou'}
  ]);
});
```

TypeScript会验证我们的测试DB是否符合接口。而且你的测试用例不需要知道任何关于你的产品数据库的信息：不需要使用没有模拟库。通过引入一个抽象（DB），我们把逻辑（和测试用例）从具体的实现（PostgresDB）细节分离出来。

结构类型的另一个优点是它可以完全切断库之间的依赖关系。更多信息，参见Item 51。

## 需要记住的事情

- 要知道JavaScript是鸭子类型，而TypeScript使用结构类型模拟这一点：可分配给接口的值可能具有超出类型声明中明确列出的属性。类型不是"密封的"。
- 请注意类也遵循结构类型规则。你可能没有所期望的类的实例！ 
- 使用结构类型来促进单元测试。



















