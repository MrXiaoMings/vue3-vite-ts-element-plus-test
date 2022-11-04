<template>
  <div class="drawer-config-container">
    <el-drawer v-model="configVisible" direction="rtl" size="40%">
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
import { ref, reactive, withDefaults, defineEmits } from 'vue'
import bus from '../utils/Bus'
interface PropItemConfig {
  configVisible: boolean
}
const props = withDefaults(defineProps<PropItemConfig>(), {
  configVisible: false
})
// section data
const formItemOptions = reactive([
  {
    label: '输入框',
    value: 'InputItemForm'
  }
])
const configForm = reactive({
  formItemType: ''
})
const emits = defineEmits(['configVisibleChange', 'dialogVisibleChange'])
// section event
const cancelFormConfig = () => { // 取消设置
  emits('configVisibleChange', false)
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
}
</style>
