
import { API } from '@/api/basic'

// 获取视图  配置
const temGetTableConf = (viewID, params) => {
  return API.post('InterfaceGrid/getCategoryViewConf/' + viewID, params).catch(err => { console.warn(err) })
}
// 获取视图  数据
const temGetTableData = (viewID) => {
  return API.post('InterfaceGrid/getCategoryViewData/' + viewID).catch(err => { console.warn(err) })
}
// 获取视图  配置  新
const newTemGetTableConf = (viewID, params) => {
  return API.post('InterfaceApi/getCategoryViewConf/' + viewID, params).catch(err => { console.warn(err) })
}
// 获取视图  数据  新
const newTemGetTableData = (viewID) => {
  return API.post('InterfaceApi/getTemplateData/' + viewID).catch(err => { console.warn(err) })
}

export {
  temGetTableConf,
  newTemGetTableConf,
  newTemGetTableData,
  temGetTableData
}
