<template>
  <div class="drawer-config-container">
    <el-drawer
        v-model="configVisible"
        :close-on-press-escape="false"
        :before-close="(done) => { configVisible = false; done();}"
        direction="rtl"
        size="40%">
      <template #title>
        <h4>表单模版配置</h4>
      </template>
      <template #default>
        <el-form :model="configForm" ref="configFormRef">
          <el-form-item label="表单控件" prop="formItemType">
            <el-select v-model="configForm.formItemType" placeholder="请选择" size="small">
              <el-option
                  v-for="item in formItemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
            <el-button v-show="configForm.formItemType" size="small" @click="itemConfigInfo" class="item-config">控件信息配置</el-button>
          </el-form-item>
          <div class="show-config-info">
          <!--   展示信息    -->
            <div class="left-show">
              <li class="left-li">
                <span class="li-label">字段中文展示：</span>
                <span class="li-value">{{configForm.labelName}}</span>
              </li>
              <li class="left-li">
                <span class="li-label">字段code：</span>
                <span class="li-value">{{configForm.valueName}}</span>
              </li>
              <li class="left-li">
                <span class="li-label">是否必填：</span>
                <span class="li-value">{{configForm.isRequired}}</span>
              </li>
            </div>
            <div class="right-show">
              <li class="left-li" :key="index" v-for="(item, index) in configForm.validateArr">
                <span class="li-label">校验规则：</span>
                <span class="li-value"></span>
              </li>
            </div>
          </div>
          <div class="config-form-foot">
            <el-button @click="cancelFormConfig">cancel</el-button>
            <el-button type="primary" @click="confirmFormConfig">confirm</el-button>
          </div>
        </el-form>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import {ref, reactive, watch, defineProps, defineEmits, onUnmounted } from 'vue'
import bus from '../utils/Bus'
interface ConfigVisibleOut {
  configVisibleOut: boolean
}
interface OptionsArr {
  label: string,
  value: string
}
interface ValidateOption {
  validateFn: string,
  arg?: Array<any>
}
interface InputFormType {
  formItemType?: string,
  labelName: string,
  valueName: string,
  placeholder?: string,
  isRequired?: boolean,
  defaultValue?: any,
  min?: number | string,
  max?: number | string,
  options?: Array<OptionsArr>,
  validateArr?: Array<ValidateOption>
}
const props = defineProps<ConfigVisibleOut>()
// section data
const configVisible = ref(true)
bus.$on('seeConfigInfo', (formItemInfo: InputFormType) => {
  configVisible.value = true
  Object.keys(formItemInfo).map((key: string) => {
    if (key) configForm[key] = formItemInfo[key] || undefined
  })
  configForm = formItemInfo
})
// section watch
watch([() => props.configVisibleOut, configVisible], ([newVal, visible], [oldVal, preVisible]) => {
  if (newVal) {
    configVisible.value = true
  }
  if (!visible) {
    emits('visibleFalse')
  }
}, {
  immediate: true
})
const formItemOptions = reactive([
  {
    label: '输入框',
    value: 'InputItemForm'
  }
])
let configForm = reactive<InputFormType>({
  formItemType: '',
  labelName: '',
  valueName: null
})
// section emits
const emits = defineEmits([ 'dialogVisibleChange', 'visibleFalse'])
// section event
const cancelFormConfig = () => { // 取消设置
  configVisible.value = false
}
const itemConfigInfo = () => {
  bus.$emit('dialogVisibleChange', true)
  bus.$emit('itemTypeChange', configForm.formItemType)
}
/**
 *@保存表单配置
 *@author liminghui
 *@date 2022-11-04 11:06:00
 */
const confirmFormConfig = () => {
  // 此处提交数据加入缓存
}
// section onUnmounted
onUnmounted(() => {
  bus.$off('seeConfigInfo')
})
</script>

<style scoped lang="scss">
.drawer-config-container {
  ::v-deep .el-drawer__header {
    margin-bottom: 0px;
  }
  .item-config {
    margin-left: 40px;
  }
  .config-form-foot {
    position: fixed;
    bottom: 30px;
    text-align: center;
  }
  .show-config-info {
    overflow: hidden;
    height: 400px;
    li {
      list-style: none;
      padding: 15px 0;
    }
    .left-show {
      height: 100%;
      float: left;
      width: calc(50% - 2px);
      border-right: 1px dashed gray;
      span {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #606266;
        font-size: 14px;
        display: inline-block;
      }
    }
    .right-show {
      width: 50%;
      float: left;
    }
    .li-label {
      width: 35%;
      text-align: right;
    }
  }
}
</style>
