<template>
<el-form :model="commonData" label-width="120px" ref="commonFormRef" class="common-form">
  <template v-for="(item, index) in formInfoData">
    <component :is="componentNames[item.type]" :itemJsonData="item" @seeConfigInfo="seeConfigInfo" :valueName="item.valueName" :commonData="commonData" />
  </template>
  <el-form-item>
    <el-button type="primary" @click="submitForm(commonFormRef)">提交</el-button>
    <el-button @click="resetForm(commonFormRef)">Reset</el-button>
  </el-form-item>
</el-form>
</template>

<script lang="ts" setup>
import {onBeforeMount, onMounted, defineAsyncComponent, reactive, shallowRef, ref, computed} from "vue"
// import { formData } from '../mock/formJson.mock'
import type { FormInstance } from 'element-plus'
import { UseFormInfo } from "../store/cacheModules/form";
// import { mapState } from "pinia";
// import { useState } from "../utils/useState"

// computed(() => {
//   return {
//     ...mapState(useFormInfo, ['formInfoData'])
//   }
// })
const storeState = UseFormInfo()
const formInfoData = reactive(storeState.$state.formInfoData)
console.log('formData', formInfoData)
const formComponents = import.meta.globEager('./commonForm/*Item.vue')
const modules = Object.keys(formComponents).reduce(
    (modules: { [key: string]: any }, path: string) => {
      const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
      modules[moduleName] = formComponents[path]?.default
      return modules
    },
    {}
)
console.log(modules)
// 动态加载组件
let componentNames: any = reactive({})
Object.keys(modules).map((key: string) => {
  componentNames[modules[key].name] = shallowRef(defineAsyncComponent(() => import(`./commonForm/${modules[key].name}.vue`)))
})
// section data
const commonFormRef = ref<FormInstance>()
const commonData: any = reactive({})
formInfoData.forEach((formItem: any, index: number) => {
  switch (formItem.type) {
    case 'CheckBoxItem':
      commonData[formItem.valueName] = []
          break
    default:
      commonData[formItem.valueName] = null
          break
  }
})
// section methods
/**
 *@校验
 *@author liminghui
 *@date 2022-11-09 14:14:55
 */
const submitForm = (commonFormRef: FormInstance | undefined) => {
  if (!commonFormRef) return
  commonFormRef.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (commonFormRef: FormInstance | undefined) => {
  if (!commonFormRef) return
  commonFormRef.resetFields()
}
const seeConfigInfo = (itemInfo) => {

}
// section beforeMount
onBeforeMount(() => {
  console.log('beforeMounted')
})
// section mounted
onMounted(() => {
  console.log('mounted')
})
</script>

<style scoped lang="scss">
.common-form {
  ::v-deep .el-form-item__content {
    flex: none;
  }
}
</style>
