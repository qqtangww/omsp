// 菜单-定期执行规则 接口
import { API } from '@/api/basic'

const saveRule = (params) => {
  return API.post('sys/Rule/saveData/1', params).catch(err => { console.warn(err) })
}

export {
  saveRule
}
