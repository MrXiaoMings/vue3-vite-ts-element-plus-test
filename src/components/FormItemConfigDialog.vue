<template>
  <div class="config-dialog">
    <el-dialog v-model="itemConfigVisible" :title="dialogTitle">
      <component ref="formTypeChild" :is="componentNames[itemType]" />
      <button @click="submitFormData">提交</button>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {formData} from "../mock/formJson.mock";
import {defineAsyncComponent, reactive, shallowRef, ref, onUnmounted, defineEmits, computed } from "vue";
import bus from '../utils/Bus'
import { mapState } from 'pinia'
import { UseFormInfo } from "../store/cacheModules/form"
// import { useState } from "../utils/useState"
import * as _ from 'lodash'

defineOptions({
  name: 'FormItemConfigDialog'
})
// section interface
interface OptionsArr {
  label: string,
  value: string
}
interface ValidateOption {
  validateFn: string,
  arg?: Array<any>
}
interface InputFormType {
  labelName: string,
  valueName: any,
  placeholder?: string,
  isRequired?: boolean,
  defaultValue?: any,
  min?: number | string,
  max?: number | string,
  options?: Array<OptionsArr>,
  validateArr?: Array<ValidateOption>
}
// section data
const formTypeChild = ref<any>()
const formStore = UseFormInfo()
const { formInfoDataCom, updateFormInfo, addFormItem } = formStore
const emits = defineEmits(['itemConfigVisibleChange'])
let itemType = ref('')
let itemConfigVisible = ref(false)
// section bus
bus.$on('itemTypeChange', (itemTypeText: string) => {
  itemType.value = itemTypeText
})
bus.$on('dialogVisibleChange', (itemType: boolean) => {
  itemConfigVisible.value = itemType
  console.log(itemType)
})
const formComponents = import.meta.globEager('./commonFormItemConfig/*Form.vue')
console.log('formData', formData)
const dialogTitle = ref('哈哈哈')
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
  componentNames[modules[key].name] = shallowRef(defineAsyncComponent(() => import(`./commonFormItemConfig/${modules[key].name}.vue`)))
})
// section computed
computed(() => {
  return {
    ...mapState(useFormInfo, ['formInfoDataCom'])
  }
})
// const storeState = useState(['formInfoData'])
// section event
const submitFormData = () => {
  formTypeChild.value.validateForm(formTypeChild.value.inputFormRef).then((formData: InputFormType) => {
    console.log(formData.labelName)
    addFormItem(formData)
    itemConfigVisible.value = false
  }).catch((err: any) => {
    console.log(err)
  })
}
// section unmounted
onUnmounted(() => {
  bus.$off('itemTypeChange')
  bus.$off('dialogVisibleChange')
})
</script>

<style scoped>

</style>
