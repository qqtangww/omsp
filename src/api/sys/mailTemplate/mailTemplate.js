
import { API } from '@/api/basic'

// 添加/编辑 邮件模板
const sysEmailSaveData1 = (params) => {
  return API.post('sys/Email/saveData/1', params).catch(err => { console.warn(err) })
}

export {
  sysEmailSaveData1
}
