import { API } from '@/api/basic'

// 修改用户密码
const updatapassword = (params) => {
  return API.post('sys/userRole/changePasswd', params).catch(err => {
    console.log(err)
  })
}
// 获取修改密码策略
const getModifierPwdAccess = () => {
  return API.post('sys/AccessPwd/userPwdRule').catch(err => {
    console.log(err)
  })
}
// 下次登录改密页面
const changePwdSendin = (params) => {
  return API.post('LoginApi/changePwdSendin', params).catch(err => {
    console.log(err)
  })
}

// 模板配置出来的页面
// 修改用户密码
const modifyUserPassword = (params) => {
  return API.post('custom_func/userRole/changePasswd', params).catch(err => {
    console.log(err)
  })
}

// 忘记密码  获取验证码
const getAuthCode = (params) => {
  return API.post('LoginApi/getEmailVerifyCode', params).catch(err => {
    console.log(err)
  })
}
// 忘记密码下一步操作
const nextStepVerify = (params) => {
  return API.post('LoginApi/checkEmailVerifyCode', params).catch(err => {
    console.log(err)
  })
}
// 忘记密码    修改密码功能
const modifyPwd = (params) => {
  return API.post('LoginApi/modifyforgetPwd', params).catch(err => {
    console.log(err)
  })
}
export {
  changePwdSendin,
  updatapassword,
  getModifierPwdAccess,
  modifyUserPassword,
  getAuthCode,
  nextStepVerify,
  modifyPwd
}
