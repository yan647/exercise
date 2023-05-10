原文：https://react.dev/reference/react/useState

# useState
`useState`是React的一个Hook，它能给你的组件添加一个`state`变量。

```javascript
const [state, setState] = useState(initialState);
```

## 引言
### useState(initialState)
在组件的顶层调用`useState`，来定义一个`state`变量。

```javascript
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
}
```

习惯上会使用数组结构比如`[something,setSomething]`来命名`state`变量。

#### 参数
- `initialState`：你希望`state`初始化成什么值。它可以是任何类型，但如果是函数，会有特殊的行为。初始化渲染后会忽略这个参数。 
如果你将函数作为`initialState`来传递，它会被视为初始化函数。它应该是纯函数，不接受参数，而且应该返回一个任意类型的值。React会在初始化组件时，调用你的初始化函数，然后把它的返回值存储为初始`state`。

#### 返回值
`useState`返回有以下两个值的数组：
1. 当前`state`。第一次调用时，它是你传递的`initialState`。
2. `set function`允许你将`state`更新为一个不同的值，并触发重新渲染。

#### 警告
- `useState`是个Hook，所以你只能在组件的顶层或者你的自定义Hook中调用它。不能在循环内或条件语句中调用它。如果需要，可以提取一个新组件，并把`state`移到新组件中。
- 在严格模式下，为帮你发现偶然的不纯，React会调用两次初始化函数。这是只在开发环境下的行为，而且不会在生产环境发生。如果你的初始化函数是纯的（本就应该这样），它不会影响行为。其中一个调用结果会被忽略。

### `set`函数，比如`setSomething(nextState)`
`set`函数通过`useState`返回，让你将`state`更新为一个不同的值，并触发重新渲染。你可以直接传递下一个`state`，或者使用函数根据前一个`state`计算它：

```javascript
const [name, setName] = useState('Edward');

function handleClick() {
  setName('Taylor');
  setAge(a => a + 1);
  // ...
}
```

#### 参数
- `nextState`：你希望`state`变成什么值。它可以是任何类型，但如果是函数，会有特殊的行为。
如果你传递一个函数作为`nextState`,它会把函数看做一个更新函数。它必须是纯的，应该只能把待处理的`state`作为它唯一的参数，然后返回下一个`state`。
React会把你的更新函数放到一个队列中，然后重新渲染你的组件。在下一次渲染的过程中，React会根据前一个`state`通过所有排队的更新函数计算下一个`state`。

#### 返回值
`set`函数没有返回值

#### 警告
- `set`函数只会在下一次渲染时更新`state`变量。如果你在调用`set`函数后读取`state`变量，你仍然会在屏幕上得到调用之前的旧值。
- 如果你提供的新值跟现在的`state`由`Object.is`判断为完全相同，React会跳过组件和它子组件的重渲染。这是个优化。尽管在一些情况下React仍然需要在略过子组件的情况下，调用你的组件，但它不应该影响你的代码。
- React会批量更新`state`。在所有事件处理器已经运行而且已经调用了他们的`set`函数之后，它会更新屏幕。这可以防止在单个事件期间进行多次重渲染。在极少数情况下，你需要强制React更早的更新屏幕，比如访问DOM，你可以使用`flushSync`。
- 在渲染期间只允许从当前渲染函数中调用`set`函数。React会丢弃它的输出，并立刻尝试使用新的`state`重新渲染它。很少需要这个模式，但是你可以使用它来存储之前渲染的信息。
- 在严格模式下，React会调用两次你的更新函数，以帮助你发现问题。是只存在开发环境的行为，不会在生产环境出现。如果你的更新函数是纯的（本来就应该这样），这不会产生任何影响。其中一个结果会被忽略。

## 使用
### 给组件添加`state`
在组件顶层调用`useState`来定义一个或多个`state`变量。

```javascript
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(42);
  const [name, setName] = useState('Taylor');
  // ...
}
```

惯例是把`state`变量用数组结构定义为`[something,setSomething]`。

`useState`返回一个包括两个值的数组：
1. 这个`state`变量的`current state`，使用你提供的`initial state`初始化。
2. `set function`允许你把`state`改成任何其他值以以响应交互。

为了更新屏幕上的内容，调用`set`函数设置新的`state`：  

```javascript
function handleClick() {
  setName('Robin');
}
```
React会存储新的`state`，使用新值重新渲染组件，更新UI。

> 陷阱
在已经执行的代码中，调用`set`函数不能改变当前的`state`：

```javascript
function handleClick() {
setName('Robin');
console.log(name); // 仍然是 "Taylor"!
}
```

> 它只影响`useState`从下一次渲染返回的内容

### 基于之前的`state`更新`state`
假设`age`是12，这个处理器调用`setAge(age+1)`三次：
```javascript
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}
```

但是，点击一次后，`age`会变成43而不是45。这是因为在已经运行中的代码中，调用`set`函数不会更新`age`状态值。所以每次的`setAge(age+1)`都变成了`setAge(43)`。

为了解决这个问题。你应该传一个更新函数而不是新的`state`给`setAge`。

```javascript
function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

这里，`a=>a+1`是你的更新函数。它拿到`pending state`然后用它计算`next state`。

React 把你的更新函数放到一个队列中。然后在下一次渲染过程中，它会用相同的顺序调用他们：
1. `a=>a+1`会拿42作为待处理的`state`然后返回43作为下一个`state`
2. `a=>a+1`会拿43作为待处理的`state`然后返回44作为下一个`state`
3. `a=>a+1`会拿44作为待处理的`state`然后返回45作为下一个`state`

没有其他队列更新，因此最后React会把45存储为当前`state`。

按照惯例，会用`state`变量名称的第一个字母命名待处理的`state`参数，比如用a代替age。然而，你也可以将它定义为`prevAge`或其他。

React会在开发环境调用两次你的更新函数以确保他们是纯的。

> 深入探索
> <br/>
> 是否总是首选使用更新函数？
> <br/>
> 你可能听说过一个建议：如果你设置的`state`是根据之前的`state`计算得到的，总是`setAge(a=>a+1)`这样写代码。这是没有危害的，但是它也不总是必须的。
> <br/>
> 多数情况下，这两种方式没有任何区别。React总会确保，对于用户的交互操作比如点击，`age`状态变量会在下次点击前更新。这就意味着一个点击处理程序会在事件处理器开始时看到无效的`age`。
> 然而，如果在同一个事件里进行多次更新，更新函数会很有帮助。如果访问`state`变量本身不方便，他们也很有帮助（在优化重渲染时可能会遇到这种情况）。
> 如果你更倾向于一致性而不是稍微冗长的语法，如果你设置的`state`是用之前的`state`计算出的，那么经常编写更新器是合理的。
> 如果它是根据之前的一些其他`state`变量计算出的，你可能想使用一个`reducer`把他们合并为一个对象
> 

### 在`state`中更新对象和数组
你可以把对象和数组放到`state`中。在React中，`state`被认为是只读的，所以你应该替换他们而不是改变已存在的对象。比如，如果你在`state`中有一个`form`对象，不改变它：

```javascript
// 🚩 不要像这样改变`state`中的对象：
form.firstName = 'Taylor';
```

相反，用一下新建的对象替换整个已有对象：
```javascript
// ✅ 用一个新对象替换`state`
setForm({
  ...form,
  firstName: 'Taylor'
});
```

### 避免再次初始化`state`
React会保存一次初始的`state`而且在下次渲染时忽略它

```javascript
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos());
  // ...
}
```

尽管`createInitialTodos()`的结果只被用在初始化渲染中，你也仍然会在每次渲染时调用这个函数。如果它创建了很大的数组或者做了很复杂的计算，将会很浪费。
为了解决这个问题，你可以在`useState`中用一个初始化函数来代替：
```javascript
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
}
```

注意你传入了`createInitialTodos`，这是函数本身，而不是`createInitialTodos()`调用它后的结果。如果你传一个函数给`useState`,React只会在初始化期间调用它。

React可能在开发环境调用你的初始化器两次用以验证他们是纯的。

### 使用`key`重置`state`
你会经常在渲染列表中遇到`key`属性。然而，它也有其他目的。
你可以通过给组件传递一个不同的`key`来重置一个组件的`state`。在这个例子中，`Reset`按钮改变了`version`变量，我们把它作为一个`key`传给了`Form`。
当`key`改变时，React重置`Form`组件（和它所有的子组件），所以它的状态也被重置了。

### 存储以前渲染的信息
通常，你会在事件处理程序中更新`state`。然而，在极少数情况下，你可能希望修改`state`以响应渲染—-例如，你可能希望在prop发生变化时修改`state`变量。

在大多数情况下，你不需要这个:
- 如果你需要的值完全可以从当前的props或其他`state`中计算出来，则完全删除冗余`state`。如果你担心过于频繁地重新计算，可以使用`useMemo`。
- 如果你想重置整个组件树的`state`，给你的组件传递一个不同的`key`。
- 如果可以，在事件处理程序中更新所有相关的`state`。

在这些都不适用的罕见情况下，你可以使用一种模式来根据到目前为止已经呈现的值更新`state`，即在组件渲染时调用`set`函数。

举个例子。`CountLabel`组件显示传递给它的计数道具:

```jsx
export default function CountLabel({ count }) {
  return <h1>{count}</h1>
}
```

假设你想显示计数器自上次更改以来是增加了还是减少了。`count`参数不会告诉你--你需要跟踪它之前的值。添加`prevCount``state`变量来跟踪它。
添加另一个称为`trend`的`state`变量来保持计数是增加还是减少。比较`prevCount`和`count`，如果它们不相等，更新`prevCount`和`trend`。
现在你可以显示当前计数参数以及自上次渲染以来它是如何变化的。

```javascript
// App.js
import { useState } from 'react';
import CountLabel from './CountLabel.js';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <CountLabel count={count} />
    </>
  );
}
```

```javascript
// CountLabel.js
import { useState } from 'react';

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count);
  const [trend, setTrend] = useState(null);
  if (prevCount !== count) {
    setPrevCount(count);
    setTrend(count > prevCount ? 'increasing' : 'decreasing');
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  );
}

```

注意如果你在渲染的时候调用`set`函数，它必须在一个类似`prevCount !== count`的条件内，而且条件中必须有一个类似`setPrevCount(count) `的调用。
否则，你的组件将会在循环中重复渲染，直至崩溃。而且，你也只能像这样更新当前渲染组件的`state`。在渲染过程中调用另一个组件的`set`函数是个错误。
最终，你的`set`调用仍然会更新`state`而不发生异变--这并不意味着你可以打破纯函数的其他规则。

这个模式很难理解，而且最好避免掉。但是，它比在effect中更新`state`要好。当你在渲染过程中调用`set`函数，你的组件用一个`return`语句退出时，在渲染子组件之前，React会立即重新渲染组件。
这样，子组件就不需要渲染两次了。组件的剩余函数仍将执行（结果将被丢弃）。如果你的条件低于所有`Hook`调用，你可以添加一个早点的`return`来尽早重新启动渲染。（**没看懂这部分**）

## 疑难解答
### 我已经更新了`state`，但是日志给我的是旧值
在运行时调用`set`函数不能改变`state`：
```javascript
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // 需要用1重渲染
  console.log(count);  // 仍然是 0!

  setTimeout(() => {
    console.log(count); // 也是 0!
  }, 5000);
}
```

这是因为`state`的行为就像快照。更新`state`请求使用新的`state`值进行重渲染，但不会影响已经在运行中的事件处理器中的`count`变量。

如果你需要使用下一个`state`，你可以在将它传递给`set`函数之前把它保存到一个变量中：

```javascript
const nextCount = count + 1;
setCount(nextCount);

console.log(count);     // 0
console.log(nextCount); // 1
```

### 我已经更新了`state`，但屏幕上没有更新

如果下一个`state`值等于前一个`state`值，React会忽略你的更新，这由`Object.is`的比较结果来决定。这经常发生在当你在`state`中修改一个对象或数组时：

```javascript
obj.x = 10;  // 🚩 错误: 改变了已存在的对象
setObj(obj); // 🚩 没有做任何事
```

你修改一个已经存在的对象`obj`而且把它传递给`setObj`，所以React忽略了更新。为了修复它，你需要确定你在`state`中总是替换对象和数组而不是修改他们：

```javascript
// ✅ 正确：创建了一个新对象
setObj({
  ...obj,
  x: 10
});
```

### 我收到一个错误："Too many re-renders"
你可能收到一个这样的错误："Too many re-renders"。React限制了渲染的次数防止无限循环。
通常，这意味着你在渲染过程中无条件的设置`state`，所以你的组件进入了一个循环：渲染，设置`state`（导致了渲染），渲染，设置`state`（导致了渲染），等等。
通常，这是事件处理器中的错误导致的：
```javascript
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

如果你没有发现这个错误的原因，在Console上点击错误附近的箭头，寻找JavaScript堆栈来发现特殊的导致错误的特定`set`函数调用。

### 我的初始化函数或更新函数运行了两次
在严格模式下，React会调用两次你的函数而不是一次：

```javascript
function TodoList() {
  // This component function will run twice for every render.

  const [todos, setTodos] = useState(() => {
    // This initializer function will run twice during initialization.
    return createTodos();
  });

  function handleClick() {
    setTodos(prevTodos => {
      // This updater function will run twice for every click.
      return [...prevTodos, createTodo()];
    });
  }

  // ...
}
```

这是预料中的，而且不会破坏你的代码。

这是只在开发环境中的行为，用来帮助你保持组件的纯净。React使用其中一个调用的结果，并且忽略其他调用的结果。只要你的组件、初始化函数、更新函数是纯净的，它就不会影响你的逻辑。但是，如果他们是不纯的，这能帮助你发现问题。

比如，在`state`中，不纯的更新函数修改一个数组：

```javascript
setTodos(prevTodos => {
  // 🚩 Mistake: mutating state
  prevTodos.push(createTodo());
});
```

因为React调用你的更新函数两次，你会看到todo被加入了两次，所以你将知道这里有问题。在这个例子中，你可以通过替换数组而不是修改它来修复这个错误。

```javascript
setTodos(prevTodos => {
  // ✅ Correct: replacing with new state
  return [...prevTodos, createTodo()];
})
```

现在这个更新函数纯净了，多调用它一次不会造成不同的行为。这就是为什么React调用它两次帮你发现问题。只有组件，初始化函数，更新函数需要保持纯净。
事件处理器不需要纯净，所以React不会调用你的事件处理器两次。

### 我尝试把函数设置给`state`，但它被调用了

你不能像这样把函数赋值给`state`：

```javascript
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

因为你传递了函数，React猜测`someFunction`是个初始化函数，而`someOtherFunction`是个更新函数，所以它尝试调用他们并存储结果。
在这两种情况下，为了存储函数，你不得不在他们之前加上()=>。然后React会存储你调用的函数。

```javascript
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```

---
## 译者的学习总结
- 要在顶层调用，不要在循环或条件语句中调用它。
- 初始化函数在开发环境下会调用两次，但在生产环境只调用一次，这是正常的。目的是辅助判断初始化函数是否为纯函数。
- 初始化函数必须是纯函数，而且不接受参数，返回一个新的`state`值。更新函数必须是纯函数，只接受待处理的`state`作为它唯一的参数，没有返回值。
- React会通过Object.is来比较新旧值是否相同，意味着如果`state`是对象或数组，只做浅比较。
- React更新`state`时是批量更新的。[如何做批量更新的](https://overreacted.io/react-as-a-ui-runtime/#batching)。（[这篇文档的全部翻译](https://thoamsy.github.io/blogs/react-as-a-runtime/)）
- `set`函数是异步的，如果在`set`后立即读取`state`值，不能保证能够获取到最新的`state`。如果需要在更新后立即访问`state`，可以使用`useEffect`钩子函数来实现。
- 如果你传一个函数给`useState`,React只会在初始化期间调用它
- 




