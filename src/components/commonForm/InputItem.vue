<template>
  <el-form-item
    :label="itemJsonData.labelName"
    :prop="itemJsonData.valueName"
    :rules="rules">
    <el-input v-model="commonData[itemJsonData.valueName]" :placeholder="itemJsonData.placeholder" />
    <el-button size="small" @click="seeConfigInfo">查看配置信息</el-button>
  </el-form-item>
</template>

<script lang="ts" setup>
import { watch, reactive, defineEmits } from 'vue'
import validateForm from "../../utils/validate";
import bus from '../../utils/Bus'
interface ItemJsonData {
  labelName: string,
  valueName: any,
  placeholder?: string
}
interface ItemProps {
  itemJsonData: ItemJsonData,
  commonData?: object
}
interface ValidateTmp {
  validator: any,
  trigger: string
}
const props = defineProps<ItemProps>()
defineOptions({
  name: "InputItem"
})
// section data
let rules: Array<any> = reactive([])
watch(() => props.itemJsonData, (newVal, oldVal) => {
  console.log('newVal', newVal)
  if(newVal && newVal.validateArr) {
    newVal.validateArr.forEach((o: any, index: number) => {
      const validateTmp: ValidateTmp = {
        validator: validateForm.validateFn()[o.validateFn],
        trigger: 'blur'
      }
      rules.push(validateTmp)
    })
    if (props.itemJsonData.isRequired) {
      rules.unshift({ required: true, message: '请输入', trigger: 'blur' })
    }
  }
}, {
  immediate: true,
  deep: true
})
// section event
const seeConfigInfo = () => {
  bus.$emit('seeConfigInfo', props.itemJsonData)
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item__content {
  min-width: 600px;
  .el-input {
    width: 60%;
    margin-right: 20px;
  }
}

</style>
