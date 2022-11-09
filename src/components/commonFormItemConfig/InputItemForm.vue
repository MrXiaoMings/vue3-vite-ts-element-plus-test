<template>
<div class="input-item-form">
  <el-form :model="inputFormData" :rules="formItemRules" ref="inputFormRef" :label-width="120">
    <el-form-item label="字段中文展示" prop="labelName">
      <el-input size="small" v-model="inputFormData.labelName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="字段code" prop="valueName">
      <el-input size="small" v-model="inputFormData.valueName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="是否必填" prop="isRequired">
      <el-radio-group v-model="inputFormData.isRequired">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <div class="validate-rules">
      <span class="rule-text">校验规则</span> <el-button @click="addRule" size="small">添加</el-button>
    </div>
      <el-form-item v-for="(v, index) in inputFormData.validateArr" :key="index" :label="`规则${index+1}`" :prop="`validateArr[${index}]validateFn`">
        <el-select size="small" v-model="v.validateFn" placeholder="请选择规则">
          <el-option v-for="(option, index) in ruleOptions" :key="index" :label="option.label" :value="option.value" />
        </el-select>
        <el-button class="rule-delete-btn" size="small" @click="deleteValidateRule(index)" type="danger">删除</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
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
  type: 'InputItem',
  labelName: '',
  valueName: null,
  placeholder: '',
  isRequired: false,
  validateArr: []
})
const initValidateObj: ValidateOption = {
  validateFn: ''
}
const inputFormRef = ref<FormInstance>()
const ruleOptions: Array<OptionsArr> = reactive([
  {
    label: '只能输中文',
    value: 'checkCharacters'
  },
  {
    label: '网址校验',
    value: 'regInternetAd'
  }
])
const formItemRules = reactive<FormRules>({
  labelName: [
    { required: true, message: '请输入字段中文展示', trigger: ['blur', 'change'] }
  ],
  valueName: [
    { required: true, message: '请输入字段Code', trigger: ['blur', 'change'] }
  ],
  isRequired: [
    { required: true, message: '请选择是否必填', trigger: 'change' }
  ]
})
// section event
const addRule = () => {
  const tmpInitObj = JSON.parse(JSON.stringify(initValidateObj))
  if (Array.isArray(inputFormData.validateArr)) {
    inputFormData.validateArr.push(tmpInitObj)
  } else {
    inputFormData.validateArr = []
    inputFormData.validateArr.push(tmpInitObj)
  }
}
const deleteValidateRule = (index: number) => {
  Array.isArray(inputFormData.validateArr) && inputFormData.validateArr.splice(index, 1)
}
const validateForm = (inputFormRef: FormInstance | undefined) => {
  return new Promise((resolve, reject) => {
    if (!inputFormRef) reject(inputFormRef)
    inputFormRef.validate((valid: boolean) => {
      if (valid) {
        resolve(inputFormData)
      } else {
        reject(valid)
      }
    })
  })
}

defineExpose({
  validateForm,
  inputFormRef
})
</script>

<style scoped lang="scss">
.input-item-form {
  .validate-rules {
    padding-left: 53px;
    margin-bottom: 20px;
    .rule-text {
      margin-right: 8px;
    }
  }
  .rule-delete-btn {
    margin-left: 15px;
  }
}
</style>
