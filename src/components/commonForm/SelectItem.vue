<template>
<el-form-item :label="itemJsonData.labelName">
  <el-select v-model="commonData[itemJsonData.valueName]" :placeholder="itemJsonData.placeholder">
    <el-option :label="item.label" :value="item.value" :key="index" v-for="(item, index) in itemJsonData.options" />
  </el-select>
</el-form-item>
</template>

<script lang="ts" setup>
interface OptionsArr {
  label: string,
  value: string
}
interface ItemJsonData {
  labelName: string,
  valueName: any,
  placeholder?: string,
  options: Array<OptionsArr>
}
interface ItemProps {
  itemJsonData: ItemJsonData,
  commonData: object
}
defineProps<ItemProps>()
defineOptions({
  name: "SelectItem"
})
</script>

<style scoped>

</style>
