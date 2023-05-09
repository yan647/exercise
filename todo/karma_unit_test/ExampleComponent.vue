<template>
  <div>this is a test component,its color is {{prop1}}</div>
</template>

<script>
export default {
  name: "ExampleComponent",
  props: {
    prop1: {
      type: String,
      default: "default value"
    },
  }
}
</script>

<style scoped>

</style>
