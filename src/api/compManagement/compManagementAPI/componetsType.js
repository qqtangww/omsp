import { API } from '@/api/basic'

// 组件类型 -修改
const modifyCopmTypeForm = (params) => {
  return API.post('component/Category/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 组件类型 -模板路径添加/修改
const saveCopmUrl = (params) => {
  return API.post('component/Category/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 组件类型 -系统操作按钮新增/修改
const saveSysOperation = (params) => {
  return API.post('component/Category/saveData/7', params).catch(err => {
    console.warn(err)
  })
}

// 组件类型 -获取系统操作
const getSysOperation = (id, params) => {
  return API.post('common/config/sysDefaultOperationList/' + id, params).catch(err => {
    console.warn(err)
  })
}
export {
  modifyCopmTypeForm,
  saveCopmUrl,
  saveSysOperation,
  getSysOperation
}
