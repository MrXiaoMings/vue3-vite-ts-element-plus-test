<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
const msg = 'This is msg content!'
const tips = 'tips content!'
</script>

<template>
<HelloWorld :msg="msg" :tips="tips"></HelloWorld>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
