<template>
<el-form :model="commonData" label-width="120px" ref="commonFormRef">
  <template v-for="(item, index) in formData">
    <component :is="componentNames[item.type]" :itemJsonData="item" :commonData="commonData" />
  </template>
</el-form>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, defineAsyncComponent, reactive } from "vue"
import { formData } from '../mock/formJson.mock'
const formComponents = import.meta.globEager('./commonForm/*Item.vue')
console.log('formData', formData)
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
  componentNames[modules[key].name] = defineAsyncComponent(() => import(`./commonForm/${modules[key].name}.vue`))
})
// section data
const commonData: object = reactive({})
onBeforeMount(() => {
  console.log('beforeMounted')
})
onMounted(() => {
  console.log('mounted')
})
</script>

<style scoped lang="scss">

</style>
