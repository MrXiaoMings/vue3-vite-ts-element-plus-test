<template>
  <el-form-item :label="itemJsonData.labelName" :prop="itemJsonData.valueName">
    <el-input v-model="commonData[itemJsonData.valueName]" :placeholder="itemJsonData.placeholder" />
  </el-form-item>
</template>

<script lang="ts" setup>
interface ItemJsonData {
  labelName: string,
  valueName: any,
  placeholder?: string
}
interface ItemProps {
  itemJsonData: ItemJsonData,
  commonData?: object
}
defineProps<ItemProps>()
defineOptions({
  name: "InputItem"
})
</script>

<style scoped>

</style>
