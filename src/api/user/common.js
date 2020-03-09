import { API } from '@/api/basic'

// ------------------------------------------------------------------------页面管理 角色管理公共接口
const roleList = (params, id = null) => {
  if (id) {
    return API.post('sys/UserRole/roleList/' + id).catch(err => { console.warn(err) })
  }
  return API.post('sys/UserRole/roleList', params).catch(err => { console.warn(err) })
}
const roleDelData = (params) => {
  return API.post('sys/UserRole/delData/2', params).catch(err => { console.warn(err) })
}
// 获取用户下的用户名
const getRoleUserList = (id, params) => {
  return API.post('sys/userRole/getSeleRoleUser/' + id, params).catch(err => { console.warn(err) })
}
const roleSaveData = (params) => {
  return API.post('sys/UserRole/saveData/2', params).catch(err => { console.warn(err) })
}
const grentUserRole = (params) => {
  return API.post('sys/userRole/grentUserRole', params).catch(err => { console.warn(err) })
}

// ------------------------------------------------------------------------用户/角色菜单 公用接口
const setRoleUser = (params) => {
  return API.post('sys/userRole/setRoleUser', params).catch(err => { console.warn(err) })
}
export {
  roleList,
  roleSaveData,
  roleDelData,
  grentUserRole,
  setRoleUser,
  getRoleUserList
}
