<template>
  <div >
  {{message}}
  <example-component prop1="red"></example-component>
  </div>
</template>

<script>
import ExampleComponent from './ExampleComponent';
export default {
  name: "App",
  data(){
    return {
      message: "Hello Vue!"
    }
  },
  components:{
    ExampleComponent
  }
}
</script>

<style scoped>

</style>
