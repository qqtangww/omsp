/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-29 14:15:45
 * @LastEditTime: 2019-09-04 14:58:44
 * @LastEditors: Please set LastEditors
 */
import { API } from '@/api/basic'

// 访问策略
const accessList = (params) => {
  return API.post('sys/AccessPwd/accessList', params).catch(err => { console.warn(err) })
}
// 访问策略管理 模糊查询
const accessFindList = (keywords) => {
  return API.post('sys/AccessPwd/accessList', keywords).catch(err => { console.warn(err) })
}
const accessPwdSaveData = (params) => {
  return API.post('sys/AccessPwd/saveData/1', params).catch(err => { console.warn(err) })
}

// 获取策略ip黑白名单列表
const accessIpList = (accessCode, accessType, params) => {
  return API.post('sys/AccessPwd/accessIpList/' + accessCode + '/' + accessType, params).catch(err => { console.warn(err) })
}
// 添加策略ip黑白名单
const accessAddIP = (params) => {
  return API.post('sys/AccessPwd/saveData/3', params).catch(err => { console.warn(err) })
}
// 删除策略ip黑白名单
const accessDelIP = (params) => {
  return API.post('sys/AccessPwd/delData/3', params).catch(err => { console.warn(err) })
}
// 策略mac黑白名单列表
const accessMacList = (accessCode, accessType, params) => {
  return API.post('sys/AccessPwd/accessMacList/' + accessCode + '/' + accessType, params).catch(err => { console.warn(err) })
}
// 策略mac黑白名单 导入接口
const accessImport = (accessCode, tab) => {
  return API.post('AccessPwd/importAccessIp/' + accessCode, tab).catch(err => { console.warn(err) })
}
// 添加策略mac黑白名单
const accessAddMac = (params) => {
  return API.post('sys/AccessPwd/saveData/4', params).catch(err => { console.warn(err) })
}
// 删除策略mac黑白名单
const accessDelMac = (params) => {
  return API.post('sys/AccessPwd/delData/4', params).catch(err => { console.warn(err) })
}
const accessPwdDelData1 = (params) => {
  return API.post('sys/AccessPwd/delData/1', params).catch(err => { console.warn(err) })
}

// 模板配置出来的 页面
const temAccessSaveData1 = (params) => {
  return API.post('custom_func/AccessPwd/saveData/1', params).catch(err => { console.warn(err) })
}
// 模板配置 - 添加策略ip黑白名单
const temAccessSaveData3 = (params) => {
  return API.post('custom_func/AccessPwd/saveData/3', params).catch(err => { console.warn(err) })
}
// 模板配置 - 添加策略mac黑白名单
const temAccessSaveData4 = (params) => {
  return API.post('custom_func/AccessPwd/saveData/4', params).catch(err => { console.warn(err) })
}

const temAccessDelIP = (params) => {
  return API.post('custom_func/AccessPwd/delData/3', params).catch(err => { console.warn(err) })
}
// 获取策略ip黑白名单列表
const temAccessIpList = (accessCode, accessType, params) => {
  return API.post('custom_func/AccessPwd/accessIpList/' + accessCode + '/' + accessType, params).catch(err => { console.warn(err) })
}
// 添加策略ip黑白名单
const temAccessAddIP = (params) => {
  return API.post('custom_func/AccessPwd/saveData/3', params).catch(err => { console.warn(err) })
}
// 策略mac黑白名单列表
const temAccessMacList = (accessCode, accessType, params) => {
  return API.post('custom_func/AccessPwd/accessMacList/' + accessCode + '/' + accessType, params).catch(err => { console.warn(err) })
}
// 删除策略mac黑白名单
const temAccessDelMac = (params) => {
  return API.post('custom_func/AccessPwd/delData/4', params).catch(err => { console.warn(err) })
}
export {
  temAccessDelMac,
  temAccessMacList,
  temAccessSaveData1,
  temAccessSaveData3,
  temAccessSaveData4,
  accessList,
  accessFindList,
  accessPwdSaveData,
  accessPwdDelData1,
  accessIpList,
  accessAddIP,
  accessImport,
  accessDelIP,
  temAccessDelIP,
  accessAddMac,
  accessDelMac,
  accessMacList,
  temAccessAddIP,
  temAccessIpList
}
