
import { API } from '@/api/basic'

// 用户 快捷菜单添加接口
const addFastMenu = (params) => {
  return API.post('user/ShortMenu/saveData', params).catch(err => {
    console.log(err)
  })
}
// 用户 拉取 快捷菜单添加接口
const getFastMenu = () => {
  return API.post('user/ShortMenu/Lists').catch(err => {
    console.log(err)
  })
}
// 用户 快捷菜单 是否默认打开
const saveFastMenuOpen = (params) => {
  return API.post('user/ShortMenu/saveExpandData', params).catch(err => {
    console.log(err)
  })
}

export {
  addFastMenu,
  getFastMenu,
  saveFastMenuOpen
}
