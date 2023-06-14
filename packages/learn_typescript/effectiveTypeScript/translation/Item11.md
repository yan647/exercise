# Item11 认识过量属性检查的限制

当你把一下对象文本分配给一个声明类型的变量，TypeScript确保它有这个类型的属性而没有其他类型的属性：

```TypeScript
interface Room {
  numDoors: number;
  ceilingHeightFt: number;
}
const r: Room = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
// ~~~~~~~~~~~~~~~~~~ Object literal may only specify known properties,
//                    and 'elephant' does not exist in type 'Room'
};
```

虽然有elephant属性是很奇怪的，但是从结构类型的角度看，这个错误没有多大意义（Item4）。这个常量可以分配给Room类型，你可以通过引入一个中间变量看到：

```TypeScript
const obj = {
  numDoors: 1,
  ceilingHeightFt: 10,
  elephant: 'present',
};
const r: Room = obj;  // OK
```

obj的类型被推断为{numDoors:number,ceilingHeightFt:number,elephant:string}。因为这个类型包括Room类型的值的子集，因此可以将它分配给Room，而且代码通过了类型检查器（查看Item7）。

所以这两个例子有什么不同呢？在第一个例子中，你触发了一个被成为"过量属性检查"的过程，这个过程有助于捕获结构类型系统可能会遗漏的一类重要错误。但是这个过程有其局限性，而且将其与常规的可分配性检查混为一谈可能会使建立结构类型的直觉更困难。意识到过量属性检查作为一个独特的过程，会帮助你建立更清晰的TypeScript类型系统的心理模型。

如Item1解释的那样，TypeScript不仅尝试标记将会在运行时抛出异常代码。它也尝试寻找不符合你意愿的代码。这有个关于后者的例子：

```TypeScript
interface Options {
  title: string;
  darkMode?: boolean;
}
function createWindow(options: Options) {
  if (options.darkMode) {
    setDarkMode();
  }
  // ...
}
createWindow({
  title: 'Spider Solitaire',
  darkmode: true
// ~~~~~~~~~~~~~ Object literal may only specify known properties, but
//               'darkmode' does not exist in type 'Options'.
//               Did you mean to write 'darkMode'?
});
```

这个代码在运行时不会抛出任何类型的错误。但是它也不可能完成你想做的事情，就像TypeScript说的那样：它应该是darkMode（大写的M），而不是darkmode。

纯粹的结构类型检查器不能发现这类错误，因为Options类型的域是非常广泛的：它包括了所有的拥有title为string的属性和任何其他属性的对象，只要这些不包括darkmode属性设置为true或false以外的属性。

人们很容易忘记TypeScript类型的扩展性。这有一些可以分配给Options的值:

```TypeScript
const o1: Options = document;  // OK
const o2: Options = new HTMLAnchorElement;  // OK
```

document和HTMLAnchorElement的实例的title属性都是字符串，所以这些赋值是OK的。Options确实是一个宽泛的类型！

过量属性检查试图在不损害类型系统的基本结构性质的情况下控制这种情况。它通过禁用对象文本上的未知的属性来实现这一点。（由于这个原因，它有时也被称为"严格对象文本检查"）。无论是document还是new HTMLAnchorElement，都不是对象文本，所以它们不能出发检查。但是对象{title,darkmode}是，因此它能触发：

```TypeScript
const o: Options = { darkmode: true, title: 'Ski Free' };
                  // ~~~~~~~~ 'darkmode' does not exist in type 'Options'...

```

这就解释了为什么使用没有类型注释的中间变量总会消除错误的原因：

```TypeScript
const intermediate = { darkmode: true, title: 'Ski Free' };
const o: Options = intermediate;  // OK
```

虽然第一行右侧是个对象文本，但第二行的右侧不是，所以过量属性检查没有启动，错误也就消失了。

当你使用类型断言时，过量类型检查不会启动：

```TypeScript
const o = { darkmode: true, title: 'Ski Free' } as Options;  // OK
```

这是个选择声明而不是断言的好理由（Item9）。

如果你不想要这种检查，你可以告诉TypeScript使用索引签名期待额外的属性：

```TypeScript
interface Options {
  darkMode?: boolean;
  [otherOptions: string]: unknown;
}
const o: Options = { darkmode: true };  // OK
```

Item15讨论了什么时候建模你的数据更合适。

对于只有一个可选属性的弱类型，一个相关的检查会发生：

```TypeScript
interface LineChartOptions {
  logscale?: boolean;
  invertedYAxis?: boolean;
  areaChart?: boolean;
}
const opts = { logScale: true };
const o: LineChartOptions = opts;
   // ~ Type '{ logScale: boolean; }' has no properties in common
   //   with type 'LineChartOptions'
```

从结构的角度看， LineChartOptions类型应该包括几乎所有的对象。对于像这样的弱类型，TypeScript添加了另一种检查，以确保类型和声明类型至少有一个共同属性。就像过量属性检查，这种方法能够有效的发现拼写错误，而且不是严格的结构化检查。但与过量属性检查不同，它会发生在所有涉及若类型的可分配性检查中。分解出一个中间变量不能绕过这个检查。

过量属性检查是个捕获拼写错误和其他错误的有效方法，否则结构类型系统将允许这些错误。对于像Options一样的包括了可选字段的类型时，它特别有用。但是它的范围非常有限：只能用于对象文本。意识到这个限制并且区分过量属性检查和普通类型检查。这会帮助你建立一个二者兼顾的心理模型。

有关过量属性检查如何捕获bug并开启新设计可能性的具体示例，参见Item18。

分解一个常量在这里消除了一个错误，但它也可能在其他情况下引入另一个错误。这方面的例子见Item26。

## 需要记住的事情

- 当你将对象文本分配给一个变量或者将其作为参数传递给函数时，它会进行过量属性检查。
- 过量属性检查是个发现错误的有效方法，但它不同于通过TypeScript类型检查器执行的通常的结构可分配性检查。把这些过程混为一谈会使你更难建立一个可分配性的心理模型。
- 请注意过量属性检查的限制：引入一个中间变量会移除这些检查。



