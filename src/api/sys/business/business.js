
// 菜单-业务类别 接口

import { API } from '@/api/basic'

// 获取业务类别列表接口
const getBusinessCateList = (params) => {
  return API.post('sys/EnumParameter/parameterCateTree', params).catch(err => {
    console.warn(err)
  })
}
// 添加/修改业务类别接口
const addBusinessCate = (params) => {
  return API.post('sys/EnumParameter/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
const delBusinessCate = (params) => {
  return API.post('sys/EnumParameter/delData/1', params).catch(err => {
    console.warn(err)
  })
}
// 添加/修改业务类别接口
const newAddBusinessCate = (params) => {
  return API.post('custom_func/EnumParameter/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
const newDelBusinessCate = (params) => {
  return API.post('custom_func/EnumParameter/delData/1', params).catch(err => {
    console.warn(err)
  })
}
export {
  getBusinessCateList,
  addBusinessCate,
  newAddBusinessCate,
  newDelBusinessCate,
  delBusinessCate
}
