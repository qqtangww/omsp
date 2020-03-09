import { API } from '@/api/basic'

// 用户管理
const userList = (params) => {
  return API.post('sys/UserRole/userList', params).catch(err => { console.warn(err) })
}
// 用户管理搜索
const userFindList = (params) => {
  return API.post('sys/userRole/userList', params).catch(err => { console.warn(err) })
}
// 用户添加、修改接口
const UserRoleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/1', params).catch(err => { console.warn(err) })
}
// 用户删除接口
const userRoleDelData = (params) => {
  return API.post('sys/UserRole/delData/1', params).catch(err => { console.warn(err) })
}
const getSeleUserRole = (id, params) => {
  return API.post('sys/userRole/getSeleUserRole/' + id, params).catch(err => { console.warn(err) })
}
// ------------------------------------------------------------------------------------------------模板配置出来的 页面↓↓↓↓↓↓
const temUserControlSaveData2 = (params) => {
  return API.post('custom_func/UserRole/saveData/1', params).catch(err => { console.warn(err) })
}
const temUserRole = (id, params) => {
  return API.post('custom_func/userRole/getSeleUserRole/' + id, params).catch(err => { console.warn(err) })
}
const temRoleList = (params, id = null) => {
  if (id) {
    return API.post('custom_func/UserRole/roleList/' + id).catch(err => { console.warn(err) })
  }
  return API.post('custom_func/UserRole/roleList', params).catch(err => { console.warn(err) })
}
const temGrentUserRole = (params) => {
  return API.post('custom_func/userRole/grentUserRole', params).catch(err => { console.warn(err) })
}
// 访问策略
const temAccessList = (params) => {
  return API.post('custom_func/AccessPwd/accessList', params).catch(err => { console.warn(err) })
}
const temPwdList = (params) => {
  return API.post('custom_func/AccessPwd/pwdList', params).catch(err => { console.warn(err) })
}

// 获取用户列表 待授权角色
const temUserRoleList = (params) => {
  return API.post('custom_func/UserRole/waitAuthList', params).catch(err => { console.warn(err) })
}
// 获取用户列表 已授权角色
const temEndUserRoleList = (params) => {
  return API.post('custom_func/UserRole/selectedAuthList', params).catch(err => { console.warn(err) })
}
export {
  temUserControlSaveData2,
  temUserRole,
  temRoleList,
  temAccessList,
  temPwdList,
  temGrentUserRole,
  userRoleDelData,
  getSeleUserRole,
  userList,
  userFindList,
  UserRoleSaveData,
  temUserRoleList,
  temEndUserRoleList
}
