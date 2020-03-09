// 菜单-页面管理 接口
import { API } from '@/api/basic'

const PagesOperationPageList = (params) => {
  return API.get('sys/PagesOperation/pageList').catch(err => { console.warn(err) })
}
const PagesOperationPageTree = (params) => {
  return API.get('sys/PagesOperation/pageTree').catch(err => { console.warn(err) })
}
// 页面添加、修改接口
const saveData = (params) => {
  return API.post('sys/PagesOperation/saveData/1', params).catch(err => { console.warn(err) })
}
// 页面删除接口
const delData = (params) => {
  return API.post('sys/PagesOperation/delData/1', params).catch(err => { console.warn(err) })
}
// 获取平台开发 路由页面以及页面操作(用于挂靠页面url) 接口
const getPlatePageUrl = (params) => {
  return API.post('sys/PagesOperation/getPlatePageUrl', params).catch(err => { console.warn(err) })
}
// 页面操作列表接口（url最后一级为页面pageid）
const getOperationList = (id) => {
  return API.get('sys/PagesOperation/getPageOperationList/' + id).catch(err => { console.warn(err) })
}
// 页面操作修改接口
const postPageEditList = (params) => {
  return API.post('sys/PagesOperation/saveData/2', params).catch(err => { console.warn(err) })
}
const getPageOperationList = (id) => {
  return API.post('sys/pagesOperation/getPageOperationList/' + id).catch(err => { console.warn(err) })
}
const grantPageOperationRole = (params) => {
  return API.post('sys/userRole/grantPageOperationRole', params).catch(err => { console.warn(err) })
}
// 页面管理 获取页面操作角色列表
const getPageOperaRoleList = (pageId, params) => {
  return API.post('sys/PagesOperation/getRoleOpeartionList/' + pageId, params).catch(err => { console.warn(err) })
}
// 页面管理 获取页面操作 已授权角色列表
const getPageOperaRoledList = (pageId, params) => {
  return API.post('sys/PagesOperation/getRoledOpeartionList/' + pageId, params).catch(err => { console.warn(err) })
}
// 页面管理 给页面操作按钮授权
const submitPageOperaRole = (pageId, params) => {
  return API.post('sys/PagesOperation/dealRoleOpeartionAuth/' + pageId, params).catch(err => { console.warn(err) })
}
// 获取该菜单的授权角色
const getRoleList = (pageid, params) => {
  return API.post('sys/PagesOperation/getRoleList/' + pageid, params).catch(err => { console.warn(err) })
}
const getRoledList = (pageid) => {
  return API.post('sys/PagesOperation/getRoledList/' + pageid).catch(err => { console.warn(err) })
}
const dealRoleAuth = (pageid, params) => {
  return API.post('sys/PagesOperation/dealRoleAuth/' + pageid, params).catch(err => { console.warn(err) })
}
// 模板配置出来的 页面

// 添加/编辑页面管理
const temPagesOperationSaveData1 = (params) => {
  return API.post('custom_func/PagesOperation/saveData/1', params).catch(err => { console.warn(err) })
}
// 删除页面管理
const temPagesOperationDelData1 = (params) => {
  return API.post('custom_func/PagesOperation/delData/1', params).catch(err => { console.warn(err) })
}
// 添加/编辑页面操作
const temPagesOperatioSaveData1 = (params) => {
  return API.post('custom_func/PagesOperation/saveData/2', params).catch(err => { console.warn(err) })
}
// 删除页面操作
const temPagesOperatioDelData2 = (params) => {
  return API.post('custom_func/PagesOperation/delData/2', params).catch(err => { console.warn(err) })
}
// 页面未授权角色列表
const temPagesOperationGetRoleList = (pageID, params) => {
  return API.post('custom_func/PagesOperation/getRoleList/' + pageID, params).catch(err => { console.warn(err) })
}
// 页面管理已授权角色列表
const temPagesOperationGetRoledList = (pageID, params) => {
  return API.post('custom_func/PagesOperation/getRoledList/' + pageID, params).catch(err => { console.warn(err) })
}
// 页面管理 页面授权
const temPagesOperationDealRoleOpeartionAuth = (pageID, params) => {
  return API.post('custom_func/PagesOperation/dealRoleAuth/' + pageID, params).catch(err => { console.warn(err) })
}

// 页面管理 操作按钮 角色列表
const temPagesOperationGetRoleOpeartionList = (pageID, params) => {
  return API.post('custom_func/PagesOperation/getRoleOpeartionList/' + pageID, params).catch(err => { console.warn(err) })
}
// 页面管理 操作按钮 已授权角色列表
const temPagesOperationGetRoledOpeartionList = (pageID, params) => {
  return API.post('custom_func/PagesOperation/getRoledOpeartionList/' + pageID, params).catch(err => { console.warn(err) })
}
// 页面管理 操作按钮授权
const temPageOpertionGetRoledOpeartionList = (pageID, params) => {
  return API.post('custom_func/PagesOperation/dealRoleOpeartionAuth/' + pageID, params).catch(err => { console.warn(err) })
}
// 页面管理 操作按钮 修改
const temPagesOperationSaveData2 = (params) => {
  return API.post('custom_func/PagesOperation/saveData/2', params).catch(err => { console.warn(err) })
}
// 页面操作列表接口（url最后一级为页面pageid）
const temPageOperationList = (id) => {
  return API.post('custom_func/pagesOperation/getPageOperationList/' + id).catch(err => { console.warn(err) })
}

export {
  temPagesOperationGetRoleOpeartionList,
  temPagesOperationSaveData2,
  temPagesOperationGetRoledOpeartionList,
  PagesOperationPageList,
  PagesOperationPageTree,
  temPageOperationList,
  getRoledList,
  dealRoleAuth,
  temPagesOperationGetRoledList,
  getRoleList,
  saveData,
  delData,
  getOperationList,
  temPageOpertionGetRoledOpeartionList,
  getPlatePageUrl,
  postPageEditList,
  submitPageOperaRole,
  getPageOperaRoledList,
  getPageOperaRoleList,
  getPageOperationList,
  temPagesOperationGetRoleList,
  temPagesOperationDealRoleOpeartionAuth,
  temPagesOperationSaveData1,
  temPagesOperationDelData1,
  temPagesOperatioSaveData1,
  temPagesOperatioDelData2,
  grantPageOperationRole
}
