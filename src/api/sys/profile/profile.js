import { API } from '@/api/basic'

// 获取系统概要信息接口
const getOutlineInterface = (params) => {
  return API.post('sys/profile/lists', params).catch(err => {
    console.warn(err)
  })
}
// 系统概要添加/修改接口
const addOutlineInterface = (params) => {
  return API.post('sys/profile/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 系统概要删除接口
const delOutlineInterface = (params) => {
  return API.post('sys/profile/delData', params).catch(err => {
    console.warn(err)
  })
}
// 模板配置出来的 页面
const temProfileSaveData1 = (params) => {
  return API.post('custom_func/profile/saveData/1', params).catch(err => { console.warn(err) })
}
export {
  temProfileSaveData1,
  getOutlineInterface,
  addOutlineInterface,
  delOutlineInterface
}
