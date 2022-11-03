<template>
    <el-form-item :label="itemJsonData.labelName" :prop="itemJsonData.valueName">
      <el-radio-group v-model="commonData[itemJsonData.valueName]">
        <el-radio :label="item.label" :value="item.value" :key="index" v-for="(item, index) in itemJsonData.options" />
      </el-radio-group>
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
  name: "RadioItem"
})
</script>

<style scoped>

</style>
