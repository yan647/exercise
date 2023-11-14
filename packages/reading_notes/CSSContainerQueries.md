## CSS容器查询

### CSS的媒体查询 VS 容器查询

#### 1. 定义

- 媒体查询(Media Queries)：允许根据设备的视口大小或其他特性为元素应用样式。
- 容器查询(Container Queries)：允许根据元素所在的容器或布局的可用空间为元素应用样式。

#### 2. 使用场景

- 媒体查询：适用于需要根据设备视口大小调整样式的场景，例如响应式设计。
- 容器查询：适用于需要根据元素所在容器的大小调整样式的场景，例如卡片组件在不同容器宽度下的布局变化。

#### 3. 优势与劣势

- 媒体查询：优势在于可以根据设备视口大小为元素应用样式，劣势在于样式不可复用，且当元素移动到具有影响尺寸的CSS属性的不同容器时可能无法正常工作。
- 容器查询：优势在于可以根据元素所在的容器或布局的可用空间为元素应用样式，使得元素在不同容器中的响应式设计更加灵活。

#### 4. 主要区别

媒体查询基于视口，而容器查询基于容器或布局。


### 容器查询的使用方法

需要注意的是：
1. container-type是必须的，如果没有，容器查询就没有效果。如果值为normal，也是没有效果的。
   原因：container-type:normal是默认值，表示不建立容器元素。size表示水平和垂直方向都建立，inline-size是只在水平方向建立
2.

### 参考
1. [mdn的容器查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_container_queries)
2. [张鑫旭写的容器查询](https://www.zhangxinxu.com/wordpress/2022/09/css-container-rule)
3. [你也许不再需要使用 CSS Media Queries（媒体查询）了 - 知乎](https://zhuanlan.zhihu.com/p/662221793)
4. [When and how to choose between media queries and container queries ...](https://blog.logrocket.com/choose-between-media-container-queries/)
