# Item 7 把类型视为值的集合

在运行时，每个变量有一个从JavaScript宇宙中选择的值。有很多可能的值，包括：

- 42
- null
- undefined
- 'Canada'
- {animal: 'Whale', weight_lbs: 40_000}
- /regex/
- new HTMLButtonElement
- (x, y) => x + y

但是在运行代码之前，当TypeScript检查错误时，变量只有一个类型。把可能的值看作一个集合，这是最好的想法。这个集合称为类型的域。比如，你可以把number类型看作所有数值的集合。42和-37.25在其中，但'Canada'不在。依赖于strictNullChecks，null和undefined可能是集合的一部分也可能不是。

最小的集合是空集合，它不包含任何值。在TypeScript中，它对应never类型。因为它的域是空，never类型的值不能被赋值给其他变量：

```typescript
const x: never = 12;
   // ~ Type '12' is not assignable to type 'never'
```

下一个最小的集合是那些包含单个值的集合。在TypeScript中，它们对应文字类型，也称为单元类型（unit types）：

```typescript
type A = 'A';
type B = 'B';
type Twelve = 12;
```

若要形成两个或三个值的类型，你可以联合单元类型：

```typescript
type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;
```

等等。联合类型对应值的并集。

单词"assignable"出现在很多TypeScript错误中。在值的集合的上下文中，它表示"成员"（表示值和类型间的关系）或"子集"（表示两个类型间的关系）：

```typescript
const a: AB = 'A';  // OK, value 'A' is a member of the set {'A', 'B'}
const c: AB = 'C';
   // ~ Type '"C"' is not assignable to type 'AB'
```

类型C是个单元类型。它只包括一个值C。它不是AB（包括A和B两个值）的子集，所以这是个错误。在一天结束的时候，几乎所有的类型检查器都在测试一个集合是否是另一个的子集：

```typescript
// OK, {"A", "B"} is a subset of {"A", "B"}:
const ab: AB = Math.random() < 0.5 ? 'A' : 'B';
const ab12: AB12 = ab;  // OK, {"A", "B"} is a subset of {"A", "B", 12}

declare let twelve: AB12;
const back: AB = twelve;
   // ~~~~ Type 'AB12' is not assignable to type 'AB'
   //        Type '12' is not assignable to type 'AB'
```

这些类型的集合是很容易推导出的，因为它们是有限的。但是实际中大多数类型都有着无限的域。对它们的推导可能更加困难。你可以把它们看作是建设性的：

```typescript
type Int = 1 | 2 | 3 | 4 | 5 // | ...
```

或者描述它们的成员：

```typescript
interface Identified {
  id: string;
}
```

可以把这个接口看作对值在它的类型域中的描述。该值是否有一个id属性，该属性的值可以分配给string（字符串的子集）？然后它就是被确定的。

上面就说这些。正如Item 4解释的那样，TypeScript的结构类型规则意味着该值也可以有其他属性。它甚至可以被调用。这个事实有时会被过量属性检查所掩盖（参见Item 11）。

把类型看作值的集合可以帮助你推理对它们的操作。比如：

```typescript
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;
```

&操作符计算两个类型的交集。什么类型的值属于PersonSpan类型？乍一看，Person和Lifespan接口没有公共的属性，所以你可能会认为它是空集（即never类型）。但是类型操作适用于值（类型的域）的集合而不是接口的属性。记住拥有附加属性的值仍然属于某个类型。所以一个同时拥有Person和Lifespan属性的值将属于交集类型：

```TypeScript
const ps: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
};  // OK
```

当然，一个值可以有多于这三个属性的属性，并且仍然属于这个类型。一般的规则是，在交集类型中的值包含每个组成部分中的联合属性。

关于交集属性的直觉是对的，但是对于两个接口的并集，而不是它们的交集：

```TypeScript
type K = keyof (Person | Lifespan);  // Type is never
```

TypeScript不能保证键属于联合类型中的值，所以联合的keyof必须是空集（never）。或者，更正式地说：

```TypeScript
keyof (A&B) = (keyof A) | (keyof B)
keyof (A|B) = (keyof A) & (keyof B)
```

如果你能建立一个直觉关于为什么这些等式成立，你就已经在理解TypeScript类型系统方面走了很长的路了！

另一种可能更常见的写PersonSpan类型的方法是使用extends：

```TypeScript
interface Person {
  name: string;
}
interface PersonSpan extends Person {
  birth: Date;
  death?: Date;
}
```

把类型看作值的集合，extends是什么意思呢？就像"可分配"一样，你可以把它看作什么的子集。PersonSpan里的每个值必须有一个name属性，该属性是string。而且每个值也必须有一个birth属性，所以它是个合适的子集。

你可能听过"子类型"这个术语。这是另一种说法，描述一个集合的域是另一个的子集。从一维、二维和三维向量的角度思考：

```TypeScript
interface Vector1D { x: number; }
interface Vector2D extends Vector1D { y: number; }
interface Vector3D extends Vector2D { z: number; }
```

你可能会说Vector3D是Vector2D的子类型，Vector2D是Vector1D的子类型（在类的上文中你也可以说子类）。这种关系通常被描述为层级结构，但是从值的集合的角度考虑，维恩图是更合适的。

维恩图清晰的说明：如果不使用extends重写接口,子集/子类型/可分配性的关系是不会改变的：

```TypeScript
interface Vector1D { x: number; }
interface Vector2D { x: number; y: number; }
interface Vector3D { x: number; y: number; z: number; }
```

集合没有改变，所以维恩图也没有变。

虽然对于对象类型，两种解释都是可行的，但是当你开始考虑文本类型和联合类型时，集合解释变得更加直观。

extends关键字也可以作为泛型的约束出现，在这里的上下文中它也意味着"子集"（Item14）。

```TypeScript
function getKey<K extends string>(val: any, key: K) {
  // ...
}
```

扩展string是什么意思呢？如果你习惯于从对象继承的角度思考，那就很难解释了。你可以定义一个对象包装类型String的子类（Item10），但是这似乎是不可取的。

另一方面，从集合的角度思考，这是很清晰的：任何类型的域都是string的子集。这包括字符串文本类型，字符串文本类型的联合和string本身：

```TypeScript
getKey({}, 'x');  // OK, 'x' extends string
getKey({}, Math.random() < 0.5 ? 'a' : 'b');  // OK, 'a'|'b' extends string
getKey({}, document.title);  // OK, string extends string
getKey({}, 12);
        // ~~ Type '12' is not assignable to parameter of type 'string'
```

在最后一个错误中，"extends"变成了"assignable"，但是这不应该妨碍我们，因为我们知道应该把它们读作"子集"。这也是个对于有限集合有帮助的思维模式，比如你可能从keyof T（返回类型只是一个对象类型的键）中得到：

```TypeScript
interface Point {
  x: number;
  y: number;
}
type PointKeys = keyof Point;  // Type is "x" | "y"

function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // ...
}
const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 0}];
sortBy(pts, 'x');  // OK, 'x' extends 'x'|'y' (aka keyof T)
sortBy(pts, 'y');  // OK, 'y' extends 'x'|'y'
sortBy(pts, Math.random() < 0.5 ? 'x' : 'y');  // OK, 'x'|'y' extends 'x'|'y'
sortBy(pts, 'z');
         // ~~~ Type '"z"' is not assignable to parameter of type '"x" | "y"
```

当类型之间的关系不是严格的层次结构，集合的解释也更有意义。比如，string|number和string|Date之间的关系是什么？他们的交集是非空的（是string），但互相不为对方的子集。他们的域之间的关系是明确的，即使这些类型不符合严格的层级结构。

把类型看作集合也可以理清数组和元组间的关系。比如：

```TypeScript
const list = [1, 2];  // Type is number[]
const tuple: [number, number] = list;
   // ~~~~~ Type 'number[]' is missing the following
   //       properties from type '[number, number]': 0, 1
```

是否有不是成对数字而是数字列表的吗？是的。空列表和列表[1]是例子。因此number[]不能赋值给[number,number]是有道理的，因为这二者之间不是子集关系（反向的赋值确实有效）。

元组可以赋值给对子吗？从结构类型的角度思考，你可能猜测它会。一个对子有0和1的键，所以也可能拥有其他键比如2？

```TypeScript
const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;
   // ~~~~~~ '[number, number, number]' is not assignable to '[number, number]'
   //          Types of property 'length' are incompatible
   //          Type '3' is not assignable to type '2'
```

答案是否定的，而且是出于一个很有趣的原因。TypeScript把数字对子建模为{0:number,1:number,length:2}，而不是{0:number,1:number}。这是有道理的--你可以检查一个元组的长度，而且它排除了这个任务。而且这可能是最好的结果！

如果把类型看作值的集合是最好的想法，这意味着拥有相同值的集合的两个类型也是相同的。的确如此。除非两个类型从语义上是不同的，而且恰好有相同的域，否则没理由将同一个类型定义两次。

最后，值得注意的是，不是所有的值的集合都对应TypeScript的类型。对于所有的整数，或者所有拥有x和y属性而没有其他属性的对象，是没有TypeScript类型的。但只有当它可以产生一个合适的TypeScript类型的时候，你可以使用Exclude来减去类型：

```TypeScript
type T = Exclude<string|Date, string|number>;  // Type is Date
type NonZeroNums = Exclude<number, 0>;  // Type is still just number
```

## 需要记住的事情
- 把类型看作值的集合。这些集合可以是有限的（比如boolean或文本类型）也可以是无限的（比如number或string）。
- TypeScript类型形成交集（一个维恩表）而不是严格的层级结构。两种类型可以重叠，而不是另一种类型的子类型。
- 记住即使一个对象有没在类型声明中的额外属性，它仍然可以属于这个类型。
- 类型操作适用于集合的域。A和B的交集是A的域和B的域的交集。对于对象类型，这意味着在A&B的值中可以同时具有A和B的属性。
- 将"extends"、"assignable to"和"subtype of"看作"subset of"的同义词。




















