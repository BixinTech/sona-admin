<template>
  <page-container
    :title="route.meta.title"
  >
    <a-space direction="vertical" :size="15" style="width: 100%">
      <a-card>
          <a-form
            layout="inline"
            ref="formRef"
            :model="formState"
          >
            <div class="control">
              <a-space>
                <a-form-item
                  v-for="(item, index) in controlCfg"
                  :key="index"
                  :name="item.key"
                  :label="item.label"
                >
                  <a-select
                    v-if="item.mode === 'tags'"
                    :placeholder="item.placeholder"
                    mode="tags"
                    v-model:value="formState[item.key]"
                    style="width: 180px"
                    :open="false"
                    allowClear
                  ></a-select>
                  <a-select
                    v-else
                    style="width: 120px"
                    :placeholder="item.placeholder"
                    v-model:value="formState[item.key]"
                  >
                    <a-select-option
                      v-for="select in item.selects"
                      :key="select.value"
                      :value="select.value"
                    >{{select.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-space>
              <a-space>
                <a-button @click="onReset">重置</a-button>
                <a-button type="primary" @click="onSearch" :loading="loading">查询</a-button>
              </a-space>
            </div>
          </a-form>
      </a-card>
      <a-card>
        <a-table :columns="columns" :dataSource="dataSource">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'cloudType'">{{supplierTypeMap[text]}}</template>
            <template v-if="column.dataIndex === 'pullStreamType'">{{streamTyperMap[text]}}</template>
          </template>
        </a-table>
      </a-card>
    </a-space>
  </page-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance } from 'ant-design-vue'
import api from '@/api'
import { IControlCfgKey, controlCfg, columns, IDataSource, supplierTypeMap, streamTyperMap } from './consts'

const route = useRoute()

const formRef = ref<FormInstance>()
const formState = reactive<Record<IControlCfgKey, any>>({
  roomIds: [],
  cloudSupplierType: '',
  pullStreamType: ''
})
const loading = ref(false)

const dataSource = ref<IDataSource[]>([])

const onReset = () => {
  formRef.value?.resetFields()
}

const fetchData = async () => {
  let data = JSON.parse(JSON.stringify(formState)) as typeof formState
  data.roomIds = data.roomIds.toString()
  const params = {}
  for (let i in data) { data[i] && (params[i] = data[i]) }
  try {
    const res = await api.queryMediaRoomInfo(params)
    dataSource.value = res as any
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const onSearch = () => {
  loading.value = true
  fetchData()
}

fetchData()

</script>

<style lang="less" scoped>
  .control {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
