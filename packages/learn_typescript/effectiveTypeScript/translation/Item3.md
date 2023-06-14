# Item 3 明白代码生成与类型无关
在高层次，tsc做了两件事：
* 它将下一代的TS/JS转换成能在浏览器中运行的老版本的JS（编译）。
* 它检查代码是否存在类型错误。

令人惊讶的是，这两种行为是完全独立的。换句话说，代码中的类型不会影响由TS到JS的编译过程。由于JS是可执行的，这就意味着类型不能影响代码的运行方式。
这里有一些令人惊讶的暗示，而且会告诉你TS能做什么和不能做什么。
带有类型错误的代码可以产生输出
由于代码输出与类型检查无关，因此有类型错误的代码可以产生输出。

```
$ cat test.ts
let x = 'hello';
x = 1234;
$ tsc test.ts
test.ts:2:1 - error TS2322: Type '1234' is not assignable to type 'string'
​
2 x = 1234;
~
​
$ cat test.js
var x = 'hello';
x = 1234;
```
如果你使用过C或Java这样的语言，他们的类型检查和输出是同时进行的，那TS的这种情况可能会非常令人惊讶。你可以认为所有的TS报错与这些语言中的警告类似：他们很可能表明了一个问题，值得探究，但他们不会停止构建。

在实践中，在代码中发现错误是很有用的。如果你正在构建一个Web应用程序，你可能知道某个特定部分存在问题。但是因为TS在存在错误的时候仍然可以生成代码，你可以在修改他们之前测试其他部分的代码。

当你提交代码的时候你的目标是零错误，以免落入必须记住预料之中或意外的错误。如果你希望禁止错误输出，可以在tsconfig.json中使用noEmitOnErrors选项，或者在构建工具中使用类似选项。

## 不能在运行时检查TS类型
你可能会写这样的代码：

```TypeScript
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
    if (shape instanceof Rectangle) {
                        // ~~~~~~~~~ 'Rectangle' only refers to a type,
                        //           but is being used as a value here
    return shape.width * shape.height;
                    //         ~~~~~~ Property 'height' does not exist
                    //                on type 'Shape'
    } else {
      return shape.width * shape.width;
    }
}
```
Instanceof的检查发生在运行时，但是Rectangle是一种类型，因此它不能影响代码的运行时行为。类型是“可擦除的”: 编译到JavaScript的部分会被简单地从代码中删除所有的接口、类型和类型注释（todo）。

为了确定要处理的类型的形状，你需要一些方法能在运行时重构它的类型。在这种情况下，你可以检查height属性是否存在：
```typescript
function calculateArea(shape: Shape) {
  if ('height' in shape) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
```

这是起作用的，因为属性检查只涉及在运行时可用的值，但仍允许类型检查器把shape的类型细化为Rectangle。

另一种方法引入一个"tag"，以运行时可用的方法显式存储类型：

```TypeScript
interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
```

这里的Shape类型是被标记的联合类型（tagged union）的一个例子。因为这种方法使得在运行时恢复类型信息变得非常容易，所以标记联合类型在TypeScript中是无处不在。

一些构造引入了一个类型（在运行时不可用）和一个值（在运行时可用）。class关键字就是其中之一。创建Square和Rectangle类可能是修复错误的另一种方法：

```TypeScript
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;  // OK
  }
}
```

这是因为class Rectangle同时引入了类型和值，而interface只引入了类型。

在type Shape =Square | Rectangle 中的Rectangle指的是类型，而shape instanceof Rectangle 中的Rectangle指的是值。这个区别对于理解是很重要的，但是可能很微妙，详情参见Item8。

## 类型操作不能影响运行时的值
假设你有一个值，可能是字符串也可能是数字，你希望将它标准化，这样它总是一个数字。这里有个类型检查器接受的错误尝试：

```TypeScript
function asNumber(val: number | string): number {
  return val as number;
}
```

通过查看生成的JavaScript，可以更清晰的看到这个函数到底是做什么的：

```javascript
function asNumber(val) {
  return val;
}
```

没有发生任何改变。as number 是类型操作，所以它不能影响代码的运行时行为。为了标准化这个值，你必须检查它的运行时类型，并使用JavaScript constructs进行转换。

```TypeScript
function asNumber(val: number | string): number {
  return typeof(val) === 'string' ? Number(val) : val;
}
```

（as number是类型断言，更多关于何时使用它更适合的详细信息，参见Item 9）

## 运行时类型可能与声明的类型不同

这个函数是否会命中最终的console.log？

```TypeScript
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log(`I'm afraid I can't do that.`);
  }
}
```

TypeScript经常标记死代码，但是即使设置了strict选项，它也不会提示这一点。你应该如何命中这个分支呢？

关键是记住boolean类型是已声明的类型。因为它是TypeScript类型，因此它在运行时就消失了。在JavaScript代码中，用户可能无意中使用类似"ON"的值调用setLightSwitch。在纯TypeScript里，也有方法触发这个代码路径。也许这个函数的参数来自一个网络请求：

```TypeScript
interface LightApiResponse {
  lightSwitchValue: boolean;
}
async function setLight() {
  const response = await fetch('/light');
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}
```

你已经声明了/light请求的结果是LightApiResponse，但没有任何事物强制执行它。如果你不了解API，并且lightSwitchValue实际上是个string，那么在运行时将向setLightSwitch传入一个字符串。或者也许这个API在你部署之后发生了变化。

当你的运行时类型与声明的类型不匹配时，TypeScript会变得相当混乱，无论什么时候你都应该避免这种情况。但是要注意，**一个值可能包含声明的类型以外的其他类型。**

## 你不能重载基于TypeScript类型的函数

像C++这样的语言允许你定义一个函数的多个版本，只是他们的参数类型不同。这被称为函数重载（function overloading）。因为你代码里的运行时行为是独立于其TypeScript类型的，所以这个结构在TypeScript是不可能的：

```TypeScript
function add(a: number, b: number) { return a + b; }
      // ~~~ Duplicate function implementation
function add(a: string, b: string) { return a + b; }
      // ~~~ Duplicate function implementation
```

TypeScript确实提供了函数重载的能力，但是它完全是在类型层面运行的。你可以为一个函数提供多重声明，但只能提供一个实现：

```TypeScript
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a, b) {
  return a + b;
}

const three = add(1, 2);  // Type is number
const twelve = add('1', '2');  // Type is string
```

add的前两个声明只提供了类型信息。当TypeScript生成JavaScript输出时，他们就被移除了，只留下实现。（如果你使用了这种重载方式，请先看一下Item 50。需要注意一些微妙之处。）

## TypeScript类型对运行时性能没有影响

因为类型和类型操作在生成JavaScript时会被移除，所以他们不会对运行时性能产生影响。TypeScript的静态类型是真实的零成本。下次有人以运行时开销为理由不使用TypeScript，你将清楚的知道他们是如何测试这种说法的。

对此有两点需要注意：

- 虽然没有运行时开销，但TypeScript编译器会引入构建时开销。TypeScript团队很重视编译器性能，而且编译通常很快，尤其是增量构建时。如果开销变得很大，你的构建工具可以使用transpile only选项来跳过类型检查。
- 为支持较旧的运行时而产生的TypeScript代码，与原生实现相比，可能会产生性能开销。例如，如果使用生成器函数，target ES5（它比生成器早），tsc会产生一些帮助代码使其运行。与生成器的原生实现相比，可能会有一些开销。无论什么情况，这都与生成的目标和语言版本有关，并且仍然独立于类型。

## 需要记住的事

- 代码生成独立于类型系统。这意味着TypeScript类型不能影响运行时的行为或代码的性能。
- 有类型错误的程序仍然可能生成代码（编译）。
- TypeScript类型在运行时不可用。为了在运行时查询类型，你需要某种方法来重构它。标记联合和属性检查是实现这一点的常用方法。一些结构比如class，同时引入了TypeScript类型和一个在运行时可用的值。







