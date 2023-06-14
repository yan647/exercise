## Vue如何记录上个路由的查询条件

### 背景
PM希望在列表页进行各种条件查询，跳转到详情页编辑保存后，返回列表页时，其查询条件、翻页状态依旧保留。

### 解决方案
#### 将查询条件、翻页状态信息都放到url上作为参数带上，保证这些条件在切换页面后也可以一直保留
#### 在详情页编辑保存后希望返回上一页时，可以使用this.$router.back()或this.$router.push(xxx)，但这样会有问题，比如：
- 如果用户把详情页放到一个新开的标签页中，这时window.history为空，$router.back()会有问题
- 使用$router.push，无法将列表页的查询条件保留下来，除非把查询条件通过参数带到详情页，但这些查询条件明显不是详情页的参数，放到详情页，明显不合适 
- 因此决定使用另一种方案：在详情页寻找上一页的name和查询条件query：如果能找到，则用$router.push，可以把查询条件也传回去；如果找不到，使用$router.push时只传name，不传查询条件**

使用beforeRouteEnter钩子函数，在跳转到详情页面前拿到上一页的name和query，存起来，在详情页保存完返回时将这些值传给$router.push

---

### 开发过程中又遇到了新的问题
1. 我们使用的是vue-class-component，直接写beforeRouteEnter函数不管用，查了一下[官网](https://kian-404.github.io/vue-class-component-zh/guide/additional-hooks.html)要这样写

```typescript
// class-component-hooks.js
import Component from 'vue-class-component'

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
```

2. 会报错：Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location:"xxxx"
查了一下[路由重复的报错](https://stackoverflow.com/questions/62462276/how-to-solve-avoided-redundant-navigation-to-current-location-error-in-vue)，
是因为重复点击路由导致的，可以通过添加catch来避免把错误展示出来，比如：
```typescript
this.$router.push({ name: 'list' }).catch(() => {
  // 解决路由重复的问题
});
```

3. beforeRouteEnter钩子拿不到this
查了下[官网](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)，可以通过next函数的vm访问组件实例，比如:
```typescript
beforeRouteEnter(to, from, next) {
    next((vm) => {
        // 通过 `vm` 访问组件实例
        vm.prevRouteQuery = from.query;
        vm.prevRouteName = from.name;
    });
}
```

---

### 最终代码
```typescript
import Component from 'vue-class-component'

export default class Detail{
    // do something
    
    prevRouteName='';
    prevRouteQuery:Dictionary<string | (string | null)[] | null | undefined>={};

    // do something
    
    save(){
        // do something

        if (!this.prevRouteName) {
            this.$router.push({ name: 'list' }).catch(() => {
              // 解决路由重复的问题
            });
        } else {
            this.$router.push({ name: this.prevRouteName, query: this.prevRouteQuery }).catch(() => {
              // 解决路由重复的问题
            });
        }
    }

    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // 通过 `vm` 访问组件实例
            vm.prevRouteQuery = from.query;
            vm.prevRouteName = from.name;
        });
    }
}
```
