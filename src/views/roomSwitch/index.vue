<template>
  <page-container :title="route.meta.title">
    <template #extra>
      <a-button @click="isShowModal = true">
        <template #icon>
          <clock-circle-outlined />
        </template>
        热切记录
      </a-button>
    </template>
    <a-card class="control">
      <a-form
        layout="vertical"
        ref="formRef"
        :model="formState"
        @finish="onChange"
      >
          <a-space direction="vertical" :size="0">
            <a-form-item
              v-for="(item, index) in controlCfg"
              :key="index"
              :name="item.key"
              :label="item.label"
              :rules="item.rules"
            >
              <a-select
                v-if="item.mode === 'tags'"
                :placeholder="item.placeholder"
                mode="tags"
                v-model:value="formState[item.key]"
                style="width: 240px"
                :open="false"
                allowClear
              ></a-select>
              <a-select
                v-if="item.mode === 'common'"
                style="width: 240px"
                :placeholder="item.placeholder"
                v-model:value="formState[item.key]"
              >
                <a-select-option
                  v-for="select in item.options"
                  :key="select.value"
                  :value="select.value"
                >{{select.name}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-button style="width: 240px" type="primary" html-type="submit" :loading="loading">立即切换</a-button>
          </a-space>
      </a-form>
    </a-card>
    <RecordModal :visible="isShowModal" @cancel="isShowModal = false" />
  </page-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { FormInstance, message } from 'ant-design-vue'
import RecordModal from './components/recordModal.vue'
import { IControlCfgKey, controlCfg } from './consts'
import api from '@/api'

const route = useRoute()

const formState = reactive<Record<IControlCfgKey,  any>>({
  roomIds: [],
  switchType: null
})
const formRef = ref<FormInstance>()
const loading = ref(false)

const onChange = async () => {
  const params = JSON.parse(JSON.stringify(formState)) as typeof formState
  params.roomIds = params.roomIds.toString()

  try {
    loading.value = true
    const res = await api.hotSwitchSelf(params)
    res && message.success('操作成功')
    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

const isShowModal = ref(false)
</script>

<style lang="less" scoped>
  .control {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
