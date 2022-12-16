<template>
  <page-container :title="route.meta.title">
    <a-space direction="vertical" :size="15" style="width: 100%">
      <a-card>
          <a-form
            layout="inline"
            ref="formRef"
            :model="formState"
            @finish="onSearch"
          >
            <div class="control">
              <a-space>
                <a-form-item
                  v-for="(item, index) in controlCfg"
                  :key="index"
                  :name="item.key"
                  :label="item.label"
                  :rules="item.rules"
                >
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
              </a-space>
              <a-space>
                <a-button @click="onReset">重置</a-button>
                <a-button type="primary" html-type="submit" >查询</a-button>
              </a-space>
            </div>
          </a-form>
      </a-card>
      <a-card>
        <a-table
          :columns="columns"
          :dataSource="dataSource"
          :loading="loading"
          :pagination="false"
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'replayUrl'"><a @click="() => onReplay(text)">{{text}}</a></template>
            <template v-if="column.dataIndex === 'source'">{{supplierTypeMap[text]}}</template>
          </template>
        </a-table>
        <div class="pageaction" v-if="dataSource.length && !end">
          <a-button @click="fetchData">加载更多</a-button>
        </div>
      </a-card>
    </a-space>
  </page-container>
  <a-modal v-model:visible="isShowModal" :width="500" title='回放' destroyOnClose :footer="null">
    <video
      style="width: 100%"
      :src="replayUrl" 
      controls
      autoPlay
      preload='auto'
    ></video>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { FormInstance, message } from 'ant-design-vue'
import dayjs from 'dayjs'
import api from '@/api'
import { supplierTypeMap } from '@/views/roomSearch/consts'
import { IControlCfgKey, columns, IControlCfg, roomNoControlCfg, uidControlCfg, timeControlCfg, streamUrlControlCfg } from './consts'

const route = useRoute()
const formRef = ref<FormInstance>()
const formState = reactive<Record<IControlCfgKey,  any>>({
  roomId: '',
  uid: '',
  time: [],
  streamId: ''
})
const isShowModal = ref(false)
const replayUrl = ref('')
const loading = ref(false)
const dataSource = ref<any[]>([])
let anchor = ''
const end = ref(false)

const routeName = computed(() => route.name as 'singleStream' | 'mixedStream' | 'streamId')

const controlCfg = computed<IControlCfg[]>(() => {
  const name = routeName.value
  return name === 'singleStream' ? [roomNoControlCfg, uidControlCfg, timeControlCfg] : name === 'streamId' ? [streamUrlControlCfg] : [{
    ...roomNoControlCfg,
    rules: [{ required: true, message: '请输入房间id' }]
  }, timeControlCfg]
})

const fetchApi = computed(() => {
  const name = routeName.value
  return name === 'singleStream' ? api.queryChatroomMultiStream : name === 'mixedStream' ? api.queryChatroomMixStream : api.queryChatroomStream
})

const onReset = () => {
  formRef.value?.resetFields()
}

const fetchData = async () => {
  try {
    if (loading.value) return
    const data = JSON.parse(JSON.stringify(formState)) as typeof formState
    const { roomId, uid, time, streamId } = data
    let startTime = ''
    let endTime = ''
    if (data.time.length) {
      startTime = dayjs(time[0]).format('YYYY-MM-DD HH:mm:ss')
      endTime = dayjs(time[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    const name = routeName.value
    if (name === 'singleStream' && !roomId && !uid) return message.error('请输入房间id或uid')
    let params:any = {}
    if (name === 'singleStream') {
      params = { startTime, endTime }
      roomId && (params.roomId = roomId)
      uid && (params.uid = uid)
    } else if (name === 'mixedStream') {
      params = { roomId, startTime, endTime }
    } else if (name === 'streamId') {
      params = { streamId }
    }
    params.limit = 20
    anchor && (params.anchor = anchor)
    loading.value = true
    const res: any = await fetchApi.value(params)
    dataSource.value = !anchor ? res.list : [...dataSource.value, ...res.list]
    if (dataSource.value.length >= res.count) {
      end.value = true
    } else {
      end.value = false
      anchor = res.anchor
    }
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const onSearch = () => {
  anchor = ''

  fetchData()
}

const onReplay = (url: string) => {
  replayUrl.value = url
  isShowModal.value = true
}
</script>

<style lang="less" scoped>
  .control {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .pageaction {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
