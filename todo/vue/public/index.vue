<template>
  <div id="vm">
    <div>欢迎：{{userName}}！你的{{type[currentType]}}是：</div>
    <input type="text" placeholder="请输入代办事项">
    <router-link to="/todo_list">{{type[0]}}</router-link>
    <router-link to="/finished">{{type[1]}}</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: "app"
  }
</script>
