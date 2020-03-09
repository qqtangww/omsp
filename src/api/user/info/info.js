import { API } from '@/api/basic'

// 获取用户信息
const getUserInfo = () => {
  return API.get('sys/UserRole/getUserProfile').catch(err => {
    console.log(err)
  })
}
// 修改用户信息
const updatedUserInfo = (params) => {
  return API.post('sys/UserRole/saveData/3', params).catch(err => {
    console.log(err)
  })
}
// 模板配置出来的 页面
const getUserInfoConfig = (params) => {
  return API.post('custom_func/UserRole/getUserProfile', params).catch(err => {
    console.log(err)
  })
}
// 修改用户信息
const modifyUserInfo = (params) => {
  return API.post('custom_func/UserRole/saveData/3', params).catch(err => {
    console.log(err)
  })
}
// 配置出来的页面

// 修改用户信息
const temUpdatedUserInfo = (params) => {
  return API.post('custom_func/UserRole/saveData/1', params).catch(err => {
    console.log(err)
  })
}
export {
  getUserInfo,
  updatedUserInfo,
  getUserInfoConfig,
  modifyUserInfo,
  temUpdatedUserInfo
}
