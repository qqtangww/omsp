import { API } from '@/api/basic'

// 消息模板保存接口
const newSaveData1 = (params) => {
  return API.post('sys/Message/saveData', params).catch(err => { console.warn(err) })
}

export {
  newSaveData1
}
