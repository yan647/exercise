<template>
  <el-radio-group
    v-model="containerType"
    class="group-radio"
    @change="changeContainerType"
  >
    <el-radio :label="1">
      <span>1用户人群ID</span>
    </el-radio>
    <el-radio :label="2">
      <span>用户人群ID</span>
    </el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: "subComponent",
  props:{
    containerType: {
      type: Number,
      default: 1
    },
  },
  methods:{
    changeContainerType(){
      console.log('changeContainerType');
    }
  }
}
</script>

<style scoped>

</style>
