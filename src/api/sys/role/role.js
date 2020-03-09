// 菜单-角色管理 接口
import { API } from '@/api/basic'

const saveRoleUser = (params) => {
  return API.post('sys/UserRole/grantRolePageOperation', params).catch(err => { console.warn(err) })
}

// 模板配置出来的 页面
const temRoleControlSaveData2 = (params) => {
  return API.post('custom_func/UserRole/saveData/2', params).catch(err => { console.warn(err) })
}
const temGetRoleUserList = (id, params) => {
  return API.post('custom_func/userRole/getSeleRoleUser/' + id, params).catch(err => { console.warn(err) })
}
const temUserList = (params) => {
  return API.post('custom_func/UserRole/userList', params).catch(err => { console.warn(err) })
}
const temSetRoleUser = (params) => {
  return API.post('custom_func/userRole/setRoleUser', params).catch(err => { console.warn(err) })
}
const temSaveRoleUser = (params) => {
  return API.post('custom_func/UserRole/grantRolePageOperation', params).catch(err => { console.warn(err) })
}
// 获取未授权的用户
const temAwaitRoleUser = (params) => {
  return API.post('custom_func/UserRole/getWaitRoleUser', params).catch(err => { console.warn(err) })
}
// 获取已授权的用户
const temEndRoleUser = (params) => {
  return API.post('custom_func/UserRole/getRoleSeledUser', params).catch(err => { console.warn(err) })
}
export {
  temRoleControlSaveData2,
  temUserList,
  temSetRoleUser,
  temSaveRoleUser,
  temGetRoleUserList,
  saveRoleUser,
  temAwaitRoleUser,
  temEndRoleUser
}
