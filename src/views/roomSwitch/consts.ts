import type { Rule } from 'ant-design-vue/es/form'

export type IControlCfgKey = 'roomIds' | 'switchType'

export type IControlCfg = {
  key: IControlCfgKey,
  label: string
  mode?: 'tags' | 'common'
  placeholder?: string
  options?: { value: string | number, name: string }[]
  rules: Rule[]
}

export const controlCfg: IControlCfg[] = [
  {
    key: 'roomIds',
    label: '房间id',
    mode: 'tags',
    placeholder: '多个值中间用逗号隔开',
    rules: [{ required: true, message: '请输入房间id' }]
  },
  {
    key: 'switchType',
    label: '云商-拉流模式',
    mode: 'common',
    placeholder: '请选择云商-拉流模式',
    options: [
      { value: 0, name: '即构混流' },
      { value: 1, name: '即构单流' },
      { value: 4, name: '腾讯单流' },
      { value: 5, name: '腾讯混流' },
    ],
    rules: [{ required: true, message: '请选择目标云商-拉流模式' }]
  }
]