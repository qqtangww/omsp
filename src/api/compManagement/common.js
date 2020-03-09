import { API } from '@/api/basic'

// 获取模板路径
const getTemplateUrl = (id) => {
  return API.post('component/Category/templateList/' + id).catch(err => { console.warn(err) })
}
// 获取模板预设值
const getTemplatePreinstall = (id) => {
  return API.post('common/config/componentPresetConf/' + id).catch(err => { console.warn(err) })
}
// 获取组件类型
const getEnumValues = (params) => {
  return API.post('common/Config/getEnumValue', params).catch(err => {
    console.warn(err)
  })
}
export {
  getTemplateUrl,
  getTemplatePreinstall,
  getEnumValues
}
