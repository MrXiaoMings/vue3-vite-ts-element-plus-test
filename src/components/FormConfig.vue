<template>
  <div class="form-container">
    <div class="form-left-show">
      <el-button type="primary" @click="addFormConfig">添加</el-button>
      <CommonForm></CommonForm>
    </div>
    <div class="form-right-config">
      <FormDrawerConfig
          @configVisibleChange="configVisibleChange"
          :configVisible="configVisible">
      </FormDrawerConfig>
    </div>
    <div class="config-dialog">
      <FormItemConfigDialog></FormItemConfigDialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import CommonForm from './Form.vue'
import FormDrawerConfig from './FormDrawerConfig.vue'
import FormItemConfigDialog from './FormItemConfigDialog.vue'
// section data
const configVisible = ref(true)
// section event
const addFormConfig = () => {
  configVisible.value = true
}
const configVisibleChange = (visible) => {
  configVisible.value = visible
}
</script>
<style scoped lang="scss">
.form-container {
  padding-left: 200px;
}
</style>
