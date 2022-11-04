<template>
  <div class="config-dialog">
    <el-dialog v-model="itemConfigVisible" :title="dialogTitle">
      <component :is="componentNames[itemType]" />
      <button @click="closeDialog">关闭</button>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {formData} from "../mock/formJson.mock";
import {defineAsyncComponent, reactive, shallowRef, ref, onUnmounted, defineEmits } from "vue";
import bus from '../utils/Bus'

defineOptions({
  name: 'FormItemConfigDialog'
})
const emits = defineEmits(['itemConfigVisibleChange'])
let itemType = ref(null)
let itemConfigVisible = ref(false)
// section bus
bus.$on('itemTypeChange', (itemTypeText) => {
  itemType.value = itemTypeText
})
bus.$on('dialogVisibleChange', (visible) => {
  itemConfigVisible.value = visible
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
// section event
const closeDialog = () => {
  itemConfigVisible.value = false
}
// section unmounted
onUnmounted(() => {
  bus.$off('itemTypeChange')
  bus.$off('dialogVisibleChange')
})
</script>

<style scoped>

</style>
