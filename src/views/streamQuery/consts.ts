import type { Rule } from 'ant-design-vue/es/form'

export type IControlCfgKey = 'roomId' | 'uid' | 'time' | 'streamId'

export const columns = [
  { title: 'uid', dataIndex: 'uid' },
  { title: '房间号', dataIndex: 'roomId' },
  { title: '回放地址', dataIndex: 'replayUrl' },
  { title: '云商', dataIndex: 'source' },
  { title: '开始时间', dataIndex: 'beginTime' },
  { title: '结束时间', dataIndex: 'endTime' },
]

export type IControlCfg = {
  key: IControlCfgKey,
  label: string
  tip?: string
  type?: 'input' | 'date'
  mode?: 'tags'
  placeholder?: string
  selects?: { value: number, name: string}[]
  rules?: Rule[]
}

export const roomNoControlCfg: IControlCfg = {
  key: 'roomId',
  label: '房间id',
  type: 'input',
  placeholder: '请输入房间id',
}
export const uidControlCfg: IControlCfg = {
  key: 'uid',
  label: 'uid',
  type: 'input',
  placeholder: '请输入uid',
}
export const timeControlCfg: IControlCfg = {
  key: 'time',
  label: '时间',
  type: 'date',
  rules: [{ required: true, message: '请选择开始日期与结束日期' }]
}
export const streamUrlControlCfg: IControlCfg = {
  key: 'streamId',
  label: '流id',
  type: 'input',
  rules: [{ required: true, message: '请输入流id' }]
}
