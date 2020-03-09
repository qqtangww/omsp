
import { API } from '@/api/basic'

// 获取表单  配置
const temGetFormConf = (FormCode, params) => {
  return API.post('InterfaceGrid/getCategoryFormConf/' + FormCode, params).catch(err => { console.warn(err) })
}

export {
  temGetFormConf
}
