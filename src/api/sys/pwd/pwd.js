// 菜单-密码策略 接口
import { API } from '@/api/basic'

const accessPwdDelData2 = (params) => {
  return API.post('sys/AccessPwd/delData/2', params).catch(err => { console.warn(err) })
}
// 密码策略
const pwdList = (params) => {
  return API.post('sys/AccessPwd/pwdList', params).catch(err => { console.warn(err) })
}
// 密码策略管理 模糊查询
const pwdFindList = (keywords) => {
  return API.post('sys/AccessPwd/pwdList', keywords).catch(err => { console.warn(err) })
}
const accessPwdSaveData2 = (params) => {
  return API.post('sys/AccessPwd/saveData/2', params).catch(err => { console.warn(err) })
}
// 模板配置出来的 页面
const temAccessPwdSaveData2 = (params) => {
  return API.post('custom_func/AccessPwd/saveData/2', params).catch(err => { console.warn(err) })
}
export {
  accessPwdDelData2,
  pwdList,
  pwdFindList,
  accessPwdSaveData2,
  temAccessPwdSaveData2
}
