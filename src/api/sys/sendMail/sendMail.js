
// 菜单-邮件发送 接口
import { API } from '@/api/basic'

// 添加/编辑 邮件管理
const sysEmailSaveData = (params) => {
  return API.post('sys/Email/saveData/5', params).catch(err => { console.warn(err) })
}
// 添加/编辑 邮件管理
const sysEmailTemplateList = () => {
  return API.post('sys/Email/emailTemplateList').catch(err => { console.warn(err) })
}
export {
  sysEmailSaveData,
  sysEmailTemplateList
}
