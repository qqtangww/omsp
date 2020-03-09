
// 样式管理 接口
import { API } from '@/api/basic'

// 添加/编辑 样式类名
const saveStyleClass = (params) => {
  return API.post('sys/StyleClass/saveData/1', params).catch(err => { console.warn(err) })
}
export {
  saveStyleClass
}
