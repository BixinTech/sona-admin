import api from '@/api'

export type IControlCfg = {
  key: string,
  label: string
  tip?: string
  type?: 'input' | 'date'
  mode?: 'tags'
  placeholder?: string
  selects?: { value: number, name: string }[]
}

const createCfg = (key: string, type: 'control' | 'columns') => {
  if (type === 'columns') return { title: key, dataIndex: key }
  return { key, label: key, type: key === 'time' ? 'date' : 'input', placeholder: `请输入${key}` }
}

const longEventControlCfgMap = ['time', 'uid', 'type', 'addr', 'cmd', 'device', 'event', 'content', 'server' ]
const longClientControlCfgMap = ['time', 'uid', 'type', 'common', 'desc', 'details', 'ip', 'model', 'network', 'osVer', 'platform']
const roomMsgControlCfgMap = ['time', 'uid', 'toUid', 'content', 'messageId', 'roomId', 'msgType', 'productCode', 'priority']
const longEventColumnsMap = ['sendTime', 'uid', 'type', 'addr', 'cmd', 'content', 'device', 'event', 'header', 'server']
const longClientColumnsMap = ['sendTime', 'uid', 'type', 'common', 'desc', 'details', 'ip', 'model', 'network', 'osVer', 'platform']
const roomMsgColumnsMap = ['sendTime', 'uid', 'toUid', 'content', 'messageId', 'roomId', 'msgType', 'productCode', 'priority']

const longEventControlCfg = longEventControlCfgMap.map(i => createCfg(i, 'control'))

const longClientControlCfg = longClientControlCfgMap.map(i => createCfg(i, 'control'))

const roomMsgControlCfg =roomMsgControlCfgMap.map(i => createCfg(i, 'control'))

const longEventColumns = longEventColumnsMap.map(i => createCfg(i, 'columns'))

const longClientColumns = longClientColumnsMap.map(i => createCfg(i, 'columns'))

const roomMsgColumns = roomMsgColumnsMap.map(i => createCfg(i, 'columns'))


export const longQueryMap = {
  longEvent: {
    controlCfg: longEventControlCfg,
    columns: longEventColumns,
    api: api.queryEventLog
  },
  longClient: {
    controlCfg: longClientControlCfg,
    columns: longClientColumns,
    api: api.queryClientLog
  },
  roomMsg: {
    controlCfg: roomMsgControlCfg,
    columns: roomMsgColumns,
    api: api.queryRoomMsgLog
  },
}