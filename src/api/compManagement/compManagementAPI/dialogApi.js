
import { API } from '@/api/basic'

// 弹框配置  新增 / 修改
// 保存排序字段排序
const saveDialog = (params) => {
  return API.post('/component/DiaLog/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
const dialogConfig = (params) => {
  return API.post('/component/DiaLog/diaLogOneData', params).catch(err => {
    console.warn(err)
  })
}
export {
  saveDialog,
  dialogConfig
}
