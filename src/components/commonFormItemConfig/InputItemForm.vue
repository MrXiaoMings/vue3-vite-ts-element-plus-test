<template>
<div class="input-item-form">
  <el-form :model="inputFormData" ref="inputForm" :label-width="120">
    <el-form-item label="字段中文展示" prop="labelName">
      <el-input v-model="inputFormData.labelName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="字段code" prop="valueName">
      <el-input v-model="inputFormData.labelName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="是否必填" prop="isRequired">
      <el-radio-group v-model="inputFormData.isRequired">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="validate-rules">
      <span>校验规则</span> <el-button @click="addRule" size="small">添加</el-button>
    </div>
      <el-form-item v-for="(v, index) in inputFormData.validateArr" :key="index" :label="`规则${index+1}`" prop="isRequired">
        <el-select v-model="v.validateFn" placeholder="请选择规则">
          <el-option v-for="(option, index) in ruleOptions" :key="index" :label="option.label" :value="option.value" />
        </el-select>
        <el-button size="small" type="danger">删除</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
defineOptions({
  name: 'InputItemForm'
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
const inputFormData: InputFormType = reactive({
  labelName: null,
  valueName: null,
  placeholder: null,
  isRequired: false,
  validateArr: []
})
const initValidateObj: ValidateOption = {
  validateFn: null
}
const ruleOptions: Array<OptionsArr> = reactive([
  {
    label: '只能输中文',
    value: 'checkCharacters'
  }
])
// section event
const addRule = () => {
  inputFormData.validateArr?.push(initValidateObj)
}
</script>

<style scoped>

</style>
