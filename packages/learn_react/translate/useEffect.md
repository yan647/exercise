原文：https://react.dev/reference/react/useEffect

# useEffect
`useEffect`是个React Hook，让你将组件与外部系统同步。

```javascript
useEffect(setup, dependencies?)
```

## 参考
### useEffect(setup, dependencies?)
在组件的顶层调用`useEffect`来定义一个Effect：
```javascript
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  // ...
}
```

#### 参数
- `setup`：这个函数里是你的Effect的逻辑。你的setup函数也可能返回一个清理函数。当你的组件加到DOM中，React会运行你的setup函数。
由于依赖改变导致的每次重渲染后，React会先运行清除函数（如果你提供了）清空旧值，然后运行你的setup函数设置新的值。在组件从DOM中移除后，React会运行你的清除函数。
- 可选的`dependencies`：`setup`代码中引用的所有响应值的列表。响应值包括：props、state和在组件中直接定义的所有变量和函数。 
如果你的Lint工具是为了React配置的，它会验证每一个响应值值是否被正确的指定为依赖。
依赖列表必须是不变的数量，而且应该被写成`[dep1, dep2, dep3]`。React会使用Object.is比较每个依赖跟它之前的值的不同。
如果你忽略了这个参数，你的Effect会在组件每次重新渲染时渲染。

#### 返回值
`useEffect`返回为空

#### 警告
- `useEffect`是个hook，所以你只能在组件顶层或你自己的hook中调用它。不能在循环或条件语句中调用它。如果必须这样做，那就抽出一个新的组件，把`state`放进去。
- 如果你不准备同步外部系统，就没必要使用`useEffect`
- 严格模式下，React只会在开发环境下，在第一个真正的设置函数之前，再多调用一次清除+设置函数。这只是个压力测试，为确保你的清除逻辑与设置逻辑是镜像的，而且停止或撤销设置函数正在执行的任何操作。如果这会导致问题，请实现清除函数。
- 如果依赖项是定义在组件内的对象或函数，这是有风险的，可能会导致`Effect`进行多余的重渲染。可以通过移除没必要的对象和函数依赖来修复这个问题。你也可以把状态更新和非响应式逻辑抽象到`Effect`之外。
（译注："non-reactive logic" 指的是那些与 React 相关的状态（如组件的 props、state 等）没有直接关联的逻辑。在 React 中使用 Effect 钩子时，需要关注这些逻辑，因为它们会影响 Effect 的触发。
在需要使用 Effect 的场景下，如果多余的非 React 相关逻辑过多，会导致组件的性能下降。因此，可以将这些非 React 相关逻辑提取到 Effect 外部，以减少 Effect 的触发次数。）









