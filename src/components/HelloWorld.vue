<template>
  <h1>{{ msg }}</h1>
  <h1>{{ `This is a tips: ${tips}` }}</h1>
  <CommonForm></CommonForm>
  <div class="element-plus-test">
    <el-button @click="clearBtn">动画</el-button>
    <transition name="el-zoom-in-top">
      <div v-show="isShow">
        {{ count }}
        <el-progress type="dashboard" :percentage="percentageCircle" :color="colors" />
      </div>
    </transition>
  </div>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CommonForm from './Form.vue'

defineProps<{
  msg: string,
  tips: string
}>()
// section data
let count = ref(0)
const percentageCircle = ref(20)
const colors = ref('blue')
let isShow = ref(true)
// section methods
const clearBtn = () => {
  count.value++
  isShow.value = !isShow.value
}
</script>
<style scoped lang="scss">
.read-the-docs {
  color: #888;
}
</style>
