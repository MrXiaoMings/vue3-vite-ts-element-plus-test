<template>
  <div class="form-container">
    <div class="form-left-show">
      <el-button type="primary" @click="addFormConfig">添加</el-button>
      <CommonForm></CommonForm>
    </div>
    <div class="form-right-config">
      <FormDrawerConfig
          :configVisibleOut="configVisibleOut"
          @visibleFalse="visibleFalse">
      </FormDrawerConfig>
    </div>
    <div class="config-dialog">
      <FormItemConfigDialog></FormItemConfigDialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CommonForm from './Form.vue'
import FormDrawerConfig from './FormDrawerConfig.vue'
import FormItemConfigDialog from './FormItemConfigDialog.vue'
import bus from '../utils/Bus'
// section data
const configVisibleOut = ref(false)
console.log(configVisibleOut.value)
bus.$on('seeConfigInfo', data => {
  // 打开侧边栏，添加缓存
})
// section event
const addFormConfig = () => {
  configVisibleOut.value = true
}
const visibleFalse = () => {
  configVisibleOut.value = false
}
</script>
<style scoped lang="scss">
.form-container {
  padding-left: 200px;
}
</style>
