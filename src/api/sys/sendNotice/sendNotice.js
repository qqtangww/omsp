// 菜单-发布消息 接口
import { API } from '@/api/basic'

// 新增/编辑通知
const sysNoticeSaveData = (params) => {
  return API.post('sys/Notice/saveData/1', params).catch(err => { console.warn(err) })
}
// 获取我所管理的组织用户【个人用户】
const getMyOrgUsers = (params) => {
  return API.post('custom_func/OrgGroup/getMyOrgUsers', params).catch(err => { console.warn(err) })
}
export {
  sysNoticeSaveData,
  getMyOrgUsers
}
