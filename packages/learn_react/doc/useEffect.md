### 该使用但没有使用useEffect的危害
在使用React开发应用时，`useEffect`是一个非常重要的Hooks。它主要用于处理一些副作用，比如数据获取、事件监听、订阅等等。如果你在需要使用`useEffect`时没有使用它，会发生以下两种情况：
1. 没有及时更新界面：在React中，组件的状态变化或者props的变化会触发页面的重新渲染。如果某些状态的更新产生的副作用没有被妥善地处理，可能会导致页面的渲染出现问题，或者像卡顿等情况。
2. 数据获取和更新不及时：如果你需要获取数据或者更新数据的时候没有使用`useEffect`，你的数据可能无法正确地及时获取或更新，使得应用的性能或者体验下降。
总之，`useEffect`是管理React副作用的一个好的方式，如果没有使用它，将会产生上述的问题，而且这些问题可能会难以调试和修复。如果你需要处理副作用，按照React的规范，应该在组件中使用`useEffect`。

### 模拟类组件中的生命周期
在 React 的函数式组件中，可以使用 `useEffect` hook 来模拟类组件中的生命周期（componentDidMount、componentDidUpdate、componentWillUnmount），代码如下：

```javascript
import React, {useState, useEffect} from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount 和 componentDidUpdate 均会触发 useEffect
  useEffect(() => {
    // 对 document.title 进行更新
    document.title = `You clicked ${count} times`;
    // 可以在这里进行其他的副作用操作，如订阅事件，移除事件等

    // componentWillUnmount 执行时，清除订阅，移除事件等
    return () => {
      // 进行清除操作，如订阅事件的取消，移除事件等
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

在上面的例子中，我们在 `useEffect` 中访问了 `document.title`，这意味着每当 `count` 更新时，页面标题也会更新。我们也可以在 `useEffect` 中执行其他副作用操作，如订阅和取消事件等。

同时，我们传递了一个函数作为 `useEffect` 的返回值，该函数将在组件卸载时执行。在这里，我们可以进行清除操作，如订阅事件取消、移除事件等。

对于类组件的 `componentDidMount`，只需要在 `useEffect` 执行的函数内，添加一个空数组（如 `[]`），避免重复执行即可。对于 `componentDidUpdate`，只需要在 `useEffect` 的参数数组中添加相关的依赖，每当依赖发生变化时，`useEffect` 将再次执行。如果省略了依赖数组，则每次组件更新时都会执行 `useEffect`。

需要注意的是，`useEffect` 是在每次渲染完成后执行的，所以请确保在其内部执行的函数中，不要做阻塞和耗时操作，避免影响组件的性能和用户体验。


### 监听对象中的属性变化
在React的函数式组件中，使用`useEffect`可以监听特定状态的改变，从而执行一些操作，但是它并不能直接监听对象中的属性变化。这是由于在判断对象是否改变时，React只是对比了对象的引用而不是对象的深层次的内容。因此，如果需要监听对象中的属性变化，可以使用其他的方式，例如将对象的属性作为 `useState` 中的状态来管理。

举个例子，假设有一个对象，需要监听它的属性变化，代码如下：

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [userData, setUserData] = useState({
    name: 'Jhon',
    age: 25
  });

  useEffect(() => {
    console.log('userData changed');
  }, [userData]);

  const handleInputChange = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
      <input type="number" name="age" value={userData.age} onChange={handleInputChange} />
    </div>
  );
}
```

在上述代码中，我们将`userData`作为 `useState` 中的状态来管理，并在`useEffect`的依赖数组中添加`userData`，从而实现了对对象属性的变化进行监听。当其中一个属性发生变化时，`useEffect`将重新执行，从而在控制台中输出相应的变更信息。

同时，我们实现了一个名为`handleInputChange`的函数来更新`userData`，此处使用了展开运算符进行浅拷贝对象，并在相关的`<input>`中通过`onChange`事件绑定了该函数，使得用户在输入时能够动态更新对象。

官网建议不要监听对象，而是直接监听对象的属性：

- If your Effect depends on an object or a function created during rendering, it might run too often. For example, this Effect re-connects after every render because the options object is different for every render
- By itself, creating a function from scratch on every re-render is not a problem. You don’t need to optimize that. However, if you use it as a dependency of your Effect, it will cause your Effect to re-run after every re-render.

### 不在组件顶层调用useEffect的危害
在 React 中使用 `useEffect` 钩子是处理副作用操作的一种方式，它是一个 React 的 Hook，旨在使用函数组件来实现类组件的一些生命周期的能力。

在使用 `useEffect` 时，需要理解其内部的工作原理，即在新的渲染周期中如何更新组件。React 在更新组件时会采用 diff 算法，判断新旧虚拟DOM的差异，进而判断是否需要进行更新操作。如果将 `useEffect` 放在组件高层级以外的位置，可能导致 `useEffect` 中引用的变量在组件的更新周期中未更新，从而导致一些问题：

1. 对于外部变量的使用可能会无效，无法更新状态
2. 可能会重复执行 `useEffect`，因为它不再属于组件的正常生命周期

举个例子：

```javascript
import React, { useEffect, useState } from 'react';

let count = 0;

function MyComponent() {
  const [val, setVal] = useState(0);

  useEffect(() => {
    setInterval(() => {
      count += 1;
      console.log(count);
    }, 1000);
  }, [val]);

  return (
    <button onClick={() => setVal(val + 1)}>
      {val}
    </button>
  );
}

export default MyComponent;
```

在这个例子中，我们定义了一个外部变量`count`，并在`useEffect`中使用了它。当组件重新渲染时，`count`并没有被重置，因此每个间隔时间计数器将增加1，并且这个计数值可能会超过你预期的次数。

因此，在使用 `useEffect` 时，需要在组件的最顶层调用，以确保它能够在每次更新后正确地执行。

### 在循环或条件中使用useEffect会发生什么

如果在 `useEffect` 中包含条件语句或循环语句会导致依赖数组（即第二个参数）引起的问题。`useEffect`的依赖项是一个数组，如果该数组中的某个值改变，那么 `useEffect` 就会重新运行。

如果你在循环里调用 `setEffect`，那么每次循环都会生成一个新的函数，而 `useEffect` 返回的是清除函数，而不是“更新”函数。所以，每次循环完后，上次设置的副作用会继续生效。如果生成的副作用执行得很慢，则可能会导致性能问题。

举个例子：

```javascript
import React, { useState, useEffect } from 'react';

function myComponent(props) {
  const [count, setCount] = useState(0);

  for (let i = 0; i < 5; i++) {
    useEffect(() => {
      console.log(`Effect for ${i}`);
    }, [count]);
  }

  return (
    <button onClick={() => setCount(count + 1)}>
      Click
    </button>
  );
}

export default myComponent;
```

在这个例子中，我们在循环中使用 `useEffect` 来记录状态更改。但结果是，无论你点击按钮几次，每个循环迭代都会运行。这是因为，直到 `useEffect` 运行时， `i` 的值仍然保留在内存中。在这种情况下，`useEffect` 应在循环的外部声明，以确保它可以正常工作。

因此，在使用 `useEffect` 时，可以确保：

- 将其放在组件内的顶部位置，以便于阅读和调试
- 不要在循环或条件语句中使用 `useEffect`
- 传递合适的依赖项，以便确保每次仅在必要时运行副作用

### 一个完整的项目中，是否可能出现只写纯函数，不写非纯函数
在一个完整的项目中，只写纯函数，不写非纯函数是不可能的。在现实工作中，我们很少能够只使用纯函数来完成我们的任务，因为很多情况下我们需要与外部环境或者设备交互，这就需要使用非纯函数了。

例如，在 React 应用中，我们需要使用 `useState`、`useEffect` 等 hooks，而这些 API 本身就不是纯函数。同时，我们还需要与浏览器进行交互，例如改变 URL、发送网络请求等等，这些操作都需要使用非纯函数。

此外，使用非纯函数在某些情况下可以提高代码的效率、降低编写成本，因为它们能够让我们更容易地实现我们想要的功能。但是，我们需要合理地使用非纯函数，确保它们不会带来无法预料的影响，例如造成状态污染、不可控制的副作用等。

因此，在现实项目中，我们需要综合考虑纯函数和非纯函数的使用，根据实际场景做出合理的选择，以确保代码的可读性、可维护性和可测试性。

### useEffect与useLayoutEffect的区别
在 React 中，`useEffect` 和 `useLayoutEffect` 都是 React 提供的 hooks，用于在函数式组件中定义副作用。它们的执行时间和返回值略有不同，具体如下：

1. `useEffect`

`useEffect` 用于在 React 组件渲染完成后执行一些副作用操作，例如订阅主题、更新状态等。它的注意点如下：

- `useEffect` 中定义的副作用操作是异步执行的。也就是说，在该副作用操作执行之前，React 组件已经完成了渲染。
- `useEffect` 的函数参数是异步执行的。这意味着 React 首先会执行完所有组件的渲染操作，然后才会执行 `useEffect` 中定义的函数。
- `useEffect` 函数可以返回一个函数，用于清理该副作用，类似于类组件中的 `componentWillUnmount` 钩子。当组件即将卸载时，React 就会执行这个清理函数。如果需要对多个状态进行订阅，通常需要在清理函数中取消这些订阅。

2. `useLayoutEffect`

`useLayoutEffect` 与 `useEffect` 类似，也用于定义副作用操作，但是有以下区别：

- `useLayoutEffect` 中定义的副作用操作是同步执行的。也就是说，在该副作用操作执行之前，组件的 DOM 已经更新完成，但是尚未到浏览器绘制的阶段。
- `useLayoutEffect` 的函数参数是同步执行的。也就是说，在该函数执行完毕之前，React 不会继续画面渲染，等待其执行结果。

因此，如果副作用操作会改变组件的样式或者布局，那么建议优先使用 `useLayoutEffect`，这可以避免渲染后用户短暂的视觉闪烁。如果副作用操作仅仅是数据统计、网络请求等不涉及 DOM 操作的异步任务，则可以使用 `useEffect`。 在大多数情况下，应该使用 `useEffect`，只有当需要在 DOM 绘制之前处理计算或修改 DOM 的属性时，才考虑使用 `useLayoutEffect`。

### useEffect与useCallback的区别

在 React 中，`useCallback` 与 `useEffect` 都是 React 提供的 hook，它们的作用虽然都是用于优化性能，但是具有不同的用途和执行时机，区别如下：

1. 用途不同

`useCallback` 用于缓存函数，避免不必要的重复创建和渲染，从而提高 React 应用的性能。而 `useEffect` 用于在组件渲染时执行一些副作用操作，比如网络请求、订阅主题等，可以访问并改变组件的状态、属性等。

2. 执行时机不同

`useCallback` 在渲染时就会执行，然后返回一个 memoized 的函数。所以在组件内部使用 `useCallback` 返回的函数，永远是同一个函数（除非依赖项变化），这样可以避免在每次渲染时创建新的函数，提高性能。

而 `useEffect` 是在组件渲染完成之后才会执行的，它可以在组件更新后自动清理原来的副作用操作。`useEffect` 可以监听组件的状态、属性等变化，并且可以访问这些变量，执行定义好的副作用操作。

3. 依赖项参数不同

`useCallback` 依赖项参数指定了该函数依赖的变量，即当依赖项变化时，返回一个新的 memoized 函数。而 `useEffect` 依赖项参数指定了监听的状态，当依赖项变化时，执行副作用操作。

因此，`useCallback` 与 `useEffect` 主要区别在于用途和执行时机，前者用于缓存函数，减少渲染次数，后者用于执行副作用操作，根据指定的形式执行并清除副作用操作。同时，`useCallback` 与 `useEffect` 接受的依赖项参数也不一样，前者依赖于函数内部的变量，后者依赖于 useEffect 的依赖项数组。


### 调用一个后端接口时，应该使用useEffect还是useCallback?

在 React 中，`useEffect` 和 `useCallback` 都可以用于调用后端接口，但是它们的使用方式和作用是不同的。因此，需要视具体情况而定，选择合适的 hook 来进行使用。

1. useEffect的使用

`useEffect` 用于在函数组件中执行副作用操作，比如异步请求后端接口。因为请求后端接口一般是一次性操作，所以它需要在组件挂载时执行，因此，我们可以将请求代码放在`useEffect`函数体中。

例如：

```
import React, { useState, useEffect } from 'react';
function MyComponent(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(resData => setData(resData))
      .catch(error => console.log(error));
  }, []);
  return <div>{ data }</div>;
}
```

这个例子中，我们在组件挂载时请求了后端接口并更新了组件状态。

2. useCallback的使用

`useCallback` 用于缓存函数，避免在每次组件重新渲染时都创建新的函数实例。因此，它可以用于缓存一个回调函数，该回调函数在其他组件中使用，并且依赖于其他状态变量。

例如：

```
import React, { useState, useCallback } from 'react';
function MyComponent(props) {
  const [data, setData] = useState([]);
  const fetchData = useCallback(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(resData => setData(resData))
      .catch(error => console.log(error));
  }, []);
  return (
    <div>
      <button onClick={fetchData}>Load Data</button>
      { data }
    </div>
  );
}
```

这个例子中，我们在组件中缓存了一个回调函数 `fetchData`，该函数用于请求后端接口，并在用户点击按钮时触发。由于此回调函数在其他组件中也可能被使用，因此，使用 `useCallback` 进行函数缓存可以提高性能。

总结：

使用 `useEffect` 和 `useCallback` 来调用后端接口，需要结合具体情况选择合适的 hook 来进行使用。如果是一次性的请求，在组件挂载时就应该发起请求，则使用 `useEffect`。如果后端接口需要处理后才能被其他组件使用，则将其封装成一个回调函数，并使用 `useCallback` 进行缓存，以提高性能并确保它在各个组件中的一致性。


[官网对useEffect的介绍](https://react.dev/reference/react/useEffect)
