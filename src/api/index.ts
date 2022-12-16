import axios from 'axios'
import { message } from 'ant-design-vue'

axios.defaults.baseURL = '配置 api 地址' // 修改此处， 配置 api 地址

axios.interceptors.response.use(res => {
    const { code, result, msg } = res.data
    if (code === '8000') {
      return result
    } else {
      message.error(msg)
      return Promise.reject(msg)
    }
  },
  error => {
    message.error(error.message)
    return Promise.reject(error.message)
  }
)

/**
 * 查询房间配置
 */
const queryMediaRoomInfo = (payload: any) => axios.post('/media/room/info', payload)

/**
 * 手动热切
 */
const hotSwitchSelf = (payload: any) => axios.post('/media/room/switch/self', payload)

/**
 * 自动热切
 */
const hotSwitchAuto = (payload: any) => axios.post('/media/room/switch/auto', payload)

/**
 * 热切记录
 */
const queryHotSwitchRecords = (payload: any) => axios.post('/media/room/switch/record', payload)

/**
 * 流录制查询单流
 */
const queryChatroomMultiStream = (payload: any) => axios.post('/stream/record/multi', payload)

/**
 * 流录制查询混流
 */
const queryChatroomMixStream = (payload: any) => axios.post('/stream/record/mixed', payload)

/**
 * 流录制查询流地址
 */
const queryChatroomStream = (payload: any) => axios.post('/stream/record/addr', payload)

/**
 * 长连事件上报日志查询
 */
const queryEventLog = (payload: any) => axios.post('/mercury/event/log/query', payload)

/**
 * 长连客户端上报日志查询
 */
const queryClientLog = (payload: any) => axios.post('/mercury/client/log/query', payload)

/**
 * 房间消息全链路日志查询
 */
const queryRoomMsgLog = (payload: any) => axios.post('/room/im/msg/log/query', payload)

export default {
  queryMediaRoomInfo,
  hotSwitchSelf,
  hotSwitchAuto,
  queryHotSwitchRecords,
  queryChatroomMultiStream,
  queryChatroomMixStream,
  queryChatroomStream,
  queryEventLog,
  queryClientLog,
  queryRoomMsgLog
}