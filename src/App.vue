<template>
  <a-config-provider :locale="zh_CN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import zh_CN from 'ant-design-vue/es/locale/zh_CN'
</script>

<style>
#app {
  height: 100%;
}
</style>