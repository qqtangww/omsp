import { API } from '@/api/basic'

// 请求 布局组件 配置
const layout = (params) => {
  return API.post('InterfaceGrid/getCategoryRegionConf/' + params).catch(err => { console.warn(err) })
}
// 请求 布局组件 配置 (大写字段)
const newLayout = (params) => {
  return API.post('InterfaceApi/getCategoryRegionConf/' + params).catch(err => { console.warn(err) })
}

export {
  layout,
  newLayout
}
