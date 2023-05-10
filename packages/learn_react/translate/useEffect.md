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
- 可选的`dependencies`：









