// 菜单-模板管理接口
import { API } from '@/api/basic'

// 导入、导出模板
const saveTemplate = (params) => {
  return API.post('sys/exportTemplate/saveData/1', params).catch(err => { console.warn(err) })
}
// 导入、导出模板
const uploadTemplate = (params) => {
  return API.post('sys/exportTemplate/upload', params).catch(err => { console.warn(err) })
}
// 获取角色 待授权权限
const getAwaitTempPwoer = (params) => {
  return API.post('sys/exportTemplate/templateNotSelectRole', params).catch(err => { console.warn(err) })
}
// 获取角色 已授权权限
const getStayTempPwoer = (params) => {
  return API.post('sys/exportTemplate/templateSelectRole', params).catch(err => { console.warn(err) })
}
// 编辑、添加数据权限
const saveTempDataPwoer = (params) => {
  return API.post('sys/exportTemplate/saveTemplateAuthData', params).catch(err => { console.warn(err) })
}
// 获取模板数据权限
const getTempDataPwoer = (params) => {
  return API.post('sys/exportTemplate/getTemplateDataAuth', params).catch(err => { console.warn(err) })
}
// 添加、修改数据权限
const getCkekBoxTempDataPwoer = (params) => {
  return API.post('sys/exportTemplate/orgList', params).catch(err => { console.warn(err) })
}
// 下载导出，导入 模板
const downloadExportTemp = (params) => {
  return API.post('sys/exportTemplate/downloadFile', params).catch(err => { console.warn(err) })
}
// 修改组织权限
const modifyOrgPower = (params) => {
  return API.post('sys/ExportTemplate/updateUseOrgSon', params).catch(err => { console.warn(err) })
}
export {
  saveTemplate,
  uploadTemplate,
  getAwaitTempPwoer,
  getStayTempPwoer,
  saveTempDataPwoer,
  getTempDataPwoer,
  getCkekBoxTempDataPwoer,
  downloadExportTemp,
  modifyOrgPower

}
