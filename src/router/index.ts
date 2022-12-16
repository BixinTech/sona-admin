import { createRouter, createWebHashHistory } from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: BasicLayout,
    meta: { title: '首页', welcome: true },
    redirect:  '/roomsetting/search',
    children: [
      {
        path: '/roomsetting',
        name: 'roomSetting',
        meta: { title: '房间配置', icon: 'deployment-unit-outlined' },
        component: BlankLayout,
        redirect: '/roomsetting/search',
        children: [
          {
            path: '/roomsetting/search',
            name: 'roomSearch',
            meta: { title: '配置查询', icon: 'search-outlined' },
            component: () => import('@/views/roomSearch/index.vue'),
          },
          {
            path: '/roomsetting/switch',
            name: 'roomSwitch',
            meta: { title: '房间热切', icon: 'swap-outlined' },
            component: () => import('@/views/roomSwitch/index.vue'),
          },
        ],
      },
      {
        path: '/streamquery',
        name: 'streamQuery',
        meta: { title: '流回溯', icon: 'node-collapse-outlined' },
        component: BlankLayout,
        redirect: '/streamquery/single',
        children: [
          {
            path: '/streamquery/single',
            name: 'singleStream',
            meta: { title: '单流', icon: 'subnode-outlined' },
            component: () => import('@/views/streamQuery/index.vue'),
          },
          {
            path: '/streamquery/mixed',
            name: 'mixedStream',
            meta: { title: '混流', icon: 'sisternode-outlined' },
            component: () => import('@/views/streamQuery/index.vue'),
          },
          {
            path: '/streamquery/streamid',
            name: 'streamId',
            meta: { title: '流id', icon: 'aim-outlined' },
            component: () => import('@/views/streamQuery/index.vue'),
          },
        ]
      },
      {
        path: '/logquery',
        name: 'logQuery',
        meta: { title: '日志查询', icon: 'file-text-outlined' },
        component: BlankLayout,
        redirect: '/logquery/longevent',
        children: [
          {
            path: '/logquery/longevent',
            name: 'longEvent',
            meta: { title: '长连日志', icon: 'node-index-outlined' },
            component: () => import('@/views/logQuery/index.vue'),
          },
          {
            path: '/logquery/longclient',
            name: 'longClient',
            meta: { title: '客户端错误', icon: 'mobile-outlined' },
            component: () => import('@/views/logQuery/index.vue'),
          },
          {
            path: '/logquery/roommsg',
            name: 'roomMsg',
            meta: { title: '房间消息', icon: 'message-outlined' },
            component: () => import('@/views/logQuery/index.vue'),
          },
        ],
      }
    ]
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
