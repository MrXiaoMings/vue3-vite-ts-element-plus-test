<template>
  <el-form-item :label="itemJsonData.labelName" :prop="itemJsonData.valueName">
    <el-checkbox-group v-model="commonData[itemJsonData.valueName]">
      <el-checkbox :label="item.value" :key="index" v-for="(item, index) in itemJsonData.options">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>

<script lang="ts" setup>
// import { withDefaults, ref } from 'vue'
interface OptionsArr {
  label: string,
  value: string
}
interface ItemJsonData {
  labelName: string,
  valueName: string,
  placeholder?: string,
  options: Array<OptionsArr>
}
interface ItemProps {
  itemJsonData: ItemJsonData,
  commonData: any,
  valueName: string
}
defineProps<ItemProps>()
defineOptions({
  name: "CheckBoxItem"
})
// const checkData = ref([])
</script>

<style scoped>

</style>
