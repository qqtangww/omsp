
import { API } from '@/api/basic'

// 获取操作按钮  相关配置
const temGetComponentContent = (params) => {
  return API.post('InterfaceGrid/getComponentContent', params).catch(err => { console.warn(err) })
}
// 获取组件类型  相关配置
const temCategoryList = (params) => {
  return API.post('component/Category/getList', params).catch(err => { console.warn(err) })
}

export {
  temGetComponentContent,
  temCategoryList
}
