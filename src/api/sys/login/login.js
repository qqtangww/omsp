import { API } from '@/api/basic'

// 登录验证码
const verificationCode = () => {
  return API.post('LoginApi/getVaildCode').catch(err => { console.warn(err) })
}
// 登录
const login = (params) => {
  return API.post('LoginApi/sendIn', params).catch(err => { console.warn(err) })
}
// const login = (params) => {
//   return API.post('LoginInfo/sendIn', params).catch(err => { console.warn(err) })
// }
// 登出
const sendOut = (params) => {
  return API.post('LoginApi/sendOut', params).catch(err => { console.warn(err) })
}
// 查询登录状态
const checkLoginIn = (params) => {
  return API.post('LoginInfo/checkLoginIn', params).catch(err => { console.warn(err) })
}
// 菜单
// const getUserMenu = (params) => {
//   return API.get('user/manage/getUserMenu').catch(err => { console.warn(err) })
// }
// 获取一二级菜单页面
const getUserMenu = (params) => {
  return API.get('loginApi/getUserInfo').catch(err => { console.warn(err) })
}
// 获取登录用户页面操作权限
const getUserJurisdiction = (pageid) => {
  return API.get('LoginApi/getUserPageOperation/' + pageid).catch(err => {
    console.warn(err)
  })
}
// 登录是获取被代理人列表
const getAgentList = (userid) => {
  return API.post('LoginApi/getAgentLists', userid).catch(err => {
    console.warn(err)
  })
}

export {
  verificationCode,
  login,
  sendOut,
  checkLoginIn,
  getUserMenu,
  getUserJurisdiction,
  getAgentList
}
