<template>
  <page-container :title="route.meta.title">
    <a-space direction="vertical" :size="15" style="width: 100%">
      <a-card>
          <a-form
            layout="inline"
            ref="formRef"
            :model="formState"
          >
            <a-row wrap :gutter="[0, 20]">
              <a-col :span="6" v-for="(item, index) in config.controlCfg" :key="index">
                <a-form-item :name="item.key">
                  <template #label>
                    <span class="label">{{item.label}}</span>
                  </template>
                  <a-input
                    v-if="item.type === 'input'"
                    :placeholder="item.placeholder"
                    v-model:value="formState[item.key]"
                    allowClear
                  />
                  <a-range-picker
                    v-if="item.type === 'date'"
                    show-time
                    v-model:value="formState[item.key]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-space class="control">
              <a-button @click="onReset">重置</a-button>
              <a-button type="primary" @click="onSearch">查询</a-button>
            </a-space>
          </a-form>
      </a-card>
      <a-card>
        <a-table
          :columns="config.columns"
          :dataSource="dataSource"
          :pagination="{ total: totalSize, pageSize, current: pageNo }"
          :loading="loading"
          @change="onChange"
          :scroll="{ x: 'max-content' }"
        >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'sendTime'">
            <span v-if="text">{{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
          <template v-if="column.dataIndex === 'content'">
            <div class="content">{{text}}</div>
          </template>
        </template>
        </a-table>
      </a-card>
    </a-space>
  </page-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance } from 'ant-design-vue'
import type { TableProps } from 'ant-design-vue'
import dayjs from 'dayjs'
import { longQueryMap } from './consts'

const route = useRoute()
const formRef = ref<FormInstance>();

const formState = reactive<Record<string,  any>>({})
let pageNo = ref(1)
const pageSize = ref(10)
const totalSize = ref(0)
const dataSource = ref([])
const loading = ref(false)

const config = computed(() => {
  return longQueryMap[route.name as 'longEvent' | 'longClient' | 'roomMsg']
})

const onReset = () => {
  formRef.value?.resetFields()
}
const fetchData = async () => {
  try {
    loading.value = true
    const params: any = {}
    Object.keys(formState).forEach(key => {
      if (formState[key]) {
        if (key === 'time') {
          params['fromTime'] = dayjs(formState[key][0]).valueOf()
          params['toTime'] = dayjs(formState[key][1]).valueOf()
        } else {
          params[key] = formState[key]
        }
      }
    })
    const res = await config.value.api({
      pageNo: pageNo.value - 1,
      pageSize: pageSize.value,
      ...params
    })
    const { content, totalElements } = res as any
    dataSource.value = content
    totalSize.value = totalElements
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const onSearch = () => {
  pageNo.value = 1
  fetchData()
}

const onChange: TableProps['onChange'] = (pagination) => {
  pageNo.value = pagination.current || 1
  pageSize.value = pagination.pageSize || 10
  fetchData()
}
</script>

<style lang="less" scoped>
  .label {
    min-width: 60px;
    display: inline-block;
  }
  .control {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 16px 16px 0 0;
  }
  .content {
    max-width: 400px;
    white-space: wrap;
  }
</style>
