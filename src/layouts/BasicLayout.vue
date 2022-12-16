<template>
  <pro-layout
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
    v-model:openKeys="state.openKeys"
    :menuData="menuData"
    :headerRender="false"
    :breadcrumb="{ routes: breadcrumb }"
    disable-content-margin
    style="min-height: 100vh"
  >
    <template #menuHeaderRender>
      <router-link :to="{ path: '/' }">
        <img src="../assets/logo.png" />
        <h1>sona-admin</h1>
      </router-link>
    </template>
    <template #breadcrumbRender="{ route, params, routes }">
      <span v-if="routes.indexOf(route) === routes.length - 1">
        {{ route.breadcrumbName }}
      </span>
      <router-link v-else :to="{ path: route.path, params }">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </pro-layout>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRouter, RouterView, RouterLink } from 'vue-router';
import { getMenuData, clearMenuItem, type RouteContextProps } from '@ant-design-vue/pro-layout';

const router = useRouter()

const { menuData } = getMenuData(clearMenuItem(router.getRoutes()))

const state = reactive<Omit<RouteContextProps, 'menuData'>>({
  collapsed: false,
  openKeys: [],
  selectedKeys: [],
})

const breadcrumb = computed(() =>
  router.currentRoute.value.matched.concat().map(item => {
    return {
      path: item.path,
      breadcrumbName: item.meta.title || '',
    };
  }),
)

watch(
  router.currentRoute,
  () => {
    const matched = router.currentRoute.value.matched.concat();
    state.selectedKeys = matched.filter(r => r.name !== 'index').map(r => r.path);
    state.openKeys = matched.filter(r => r.path !== router.currentRoute.value.path).map(r => r.path);
  },
  {
    immediate: true,
  },
)
</script>
