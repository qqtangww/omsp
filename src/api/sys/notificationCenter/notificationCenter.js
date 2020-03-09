import { API } from '@/api/basic'
// 获取通知中心
const getInformation = (params) => {
  return API.post('sys/Message/mssageList', params).catch(err => {
    console.warn(err)
  })
}
// 删除通知
const delInformation = (params) => {
  return API.post('sys/Message/delData/2', params).catch(err => {
    console.warn(err)
  })
}
// 全部标记已读通知
const allReadInformation = (params) => {
  return API.post('sys/Message/setReading', params).catch(err => {
    console.warn(err)
  })
}
// 查看通知
const seeInformation = (params) => {
  return API.post('sys/Message/clickReading', params).catch(err => {
    console.warn(err)
  })
}
// 获取消息中心
const getMessageCentre = (params) => {
  return API.post('sys/News/newsList', params).catch(err => {
    console.warn(err)
  })
}
// 删除消息
const delMessage = (params) => {
  return API.post('sys/News/delData/2', params).catch(err => {
    console.warn(err)
  })
}
// 全部标记已读消息
const allReadMessage = (params) => {
  return API.post('sys/News/setReading', params).catch(err => {
    console.warn(err)
  })
}
// 点击查看通知、消息
const clickQueryMessage = (params) => {
  return API.post('sys/News/clickReading', params).catch(err => {
    console.warn(err)
  })
}
export {
  getInformation,
  getMessageCentre,
  clickQueryMessage,
  delInformation,
  seeInformation,
  delMessage,
  allReadInformation,
  allReadMessage
}
