import { API } from '@/api/basic'

// 获取用户代理信息接口
const getAgentInfo = (params) => {
  return API.post('user/Agent/lists', params).catch(err => {
    console.log(err)
  })
}
// 用户代理信息添加/修改接口
const addAgentList = (params) => {
  return API.post('user/Agent/saveData/1', params).catch(err => {
    console.log(err)
  })
}
// 用户代理信息删除接口
const delAgentList = (params) => {
  return API.post('user/Agent/delData/1', params).catch(err => {
    console.log(err)
  })
}
// 模板配置出来的 页面
const temAgentSaveData2 = (params) => {
  return API.post('custom_func/Agent/saveData/1', params).catch(err => { console.warn(err) })
}
// 代理人列表
const temAgentUserList = (params) => {
  return API.post('custom_func/UserRole/userList', params).catch(err => { console.warn(err) })
}
export {
  temAgentUserList,
  getAgentInfo,
  addAgentList,
  temAgentSaveData2,
  delAgentList
}
