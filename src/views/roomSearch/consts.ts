export type IControlCfgKey = 'roomIds' | 'cloudSupplierType' | 'pullStreamType'

type IControlCfg = {
  key: IControlCfgKey,
  label: string
  tip?: string
  mode?: 'tags'
  placeholder?: string
  selects?: { value: string, name: string }[]
}

export const controlCfg: IControlCfg[] = [
  {
    key: 'roomIds',
    label: '房间id',
    tip: '房间号和roomId是互斥搜索',
    mode: 'tags',
    placeholder: '多个值中间用逗号隔开',
  },
  {
    key: 'cloudSupplierType',
    label: '云商',
    placeholder: '请选择',
    selects: [
      { value: '', name: '全部' },
      { value: 'ZEGO', name: '即构' },
      { value: 'TENCENT', name: '腾讯' },
    ]
  },
  { 
    key: 'pullStreamType',
    label: '拉流模式',
    placeholder: '请选择',
    selects: [
      { value: '', name: '全部' },
      { value: 'MULTI', name: '单流' },
      { value: 'MIXED', name: '混流' },
    ]
  },
]

export const columns = [
  { title: '房间id', dataIndex: 'roomId' },
  { title: '云商', dataIndex: 'cloudType' },
  { title: '拉流模式', dataIndex: 'pullStreamType' },
  { title: '流地址', dataIndex: 'streamUrl' },
]

export type IDataSource = {
  cloudType: string
  pullSteamType: string
  roomId: string
  steamUrl: string
}[]

export const supplierTypeMap = {
  ZEGO: '即构',
  TENCENT: '腾讯'
}

export const streamTyperMap = {
  MULTI: '单流',
  MIXED: '混流'
}