
import { API } from '@/api/basic'

// 获取tabs标签的数据
const getLeftTabsNav = (params) => {
  return API.post('component/Category/componentTabList', params).catch(err => {
    console.warn(err)
  })
}
// 修改/添加左右布局实例
const saveLayoutInstance = (params) => {
  return API.post('component/Category/saveData/3 ', params).catch(err => {
    console.warn(err)
  })
}
// 修改/添加Tabs标签数据
const saveTabsData = (params) => {
  return API.post('component/Category/saveData/4', params).catch(err => {
    console.warn(err)
  })
}
// 添加Tabs实例配置数据
const saveInstanceConfig = (params) => {
  return API.post('component/Category/saveTabInstance', params).catch(err => {
    console.warn(err)
  })
}
// Tabs 未授权角色
const tabFlagNotSelectRole = (regionCode, params) => {
  return API.post('component/Region/tabFlagNotSelectRole/' + regionCode, params).catch(err => {
    console.warn(err)
  })
}
// Tabs 已授权角色
const tabFlagSelectRole = (regionCode, params) => {
  return API.post('component/Region/tabFlagSelectRole/' + regionCode, params).catch(err => {
    console.warn(err)
  })
}
export {
  getLeftTabsNav,
  saveLayoutInstance,
  saveTabsData,
  tabFlagNotSelectRole,
  tabFlagSelectRole,
  saveInstanceConfig
}
