<template>
  <a-modal
    :visible="visible"
    :footer="null"
    :width="1000"
    title="房间热切记录"
    @cancel="emit('cancel')"
    destroyOnClose
  >
    <a-table
      :columns="columns"
      :dataSource="dataSource"
      :pagination="{ total: totalSize, pageSize }"
      :loading="loading"
      @change="onChange"
    >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'pullMode'">{{streamTyperMap[text]}}</template>
        <template v-if="column.dataIndex === 'streamSupplier'">{{supplierTypeMap[text]}}</template>
        <template v-if="column.dataIndex === 'switchType'">
          {{[1, 0].includes(text as any) ? '手动' : '自动'}}
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}}
        </template>
        <template v-if="column.dataIndex === 'status'">
          <a-badge
            :status="!text ? 'processing' : text === 1 ? 'success' : 'error'"
            :text="!text ? '进行中' : text === 1 ? '成功' : '失败'"
          />
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import type { TableProps } from 'ant-design-vue'
import dayjs from 'dayjs'
import api from '@/api'
import { supplierTypeMap, streamTyperMap } from '@/views/roomSearch/consts'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['cancel'])

const columns = [
  { dataIndex: 'id', title: 'tid', },
  { dataIndex: 'pullMode', title: '拉流模式' },
  { dataIndex: 'streamSupplier', title: '云商' },
  { dataIndex: 'createTime', title: '时间' },
  { title: '状态', dataIndex: 'status' },
  { dataIndex: 'operator', title: '操作人' }
]

let start = 1
const pageSize = ref(10)

const dataSource = ref([])
const totalSize = ref(0)
const loading = ref(false)

watch(() => props.visible, (newVal) => {
  if (newVal) {
    fetchData()
  } else {
    start = 1
    dataSource.value = []
    totalSize.value = 0
    pageSize.value = 10
    loading.value = false
  }
})

const fetchData = async () => {
  try {
    loading.value = true
    const res = await api.queryHotSwitchRecords({ start, pageSize: pageSize.value })
    const { list, count } = res as any
    dataSource.value = list
    totalSize.value = count
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const onChange: TableProps['onChange'] = (pagination) => {
  start = pagination.current || 1
  pageSize.value = pagination.pageSize || 10
  fetchData()
}
</script>

<style lang="less" scoped></style>