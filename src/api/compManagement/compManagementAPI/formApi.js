import { API } from '@/api/basic'

// 表单配置  新增 / 修改
const saveForm = (params) => {
  return API.post('component/form/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 获取表单操作按钮数据
const getOperationBtn = (id) => {
  return API.post('component/form/operationsList/' + id).catch(err => {
    console.warn(err)
  })
}
// 表单操作新增/编辑按钮
const saveOperationBtn = (params) => {
  return API.post('component/form/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 表单操作按钮调序
const sortOperations = (id, params) => {
  return API.post('component/form/operationSort/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 表单操作按钮调序
const getAwaitJurisdiction = (id, params) => {
  return API.post('component/form/waitAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 表单操作按钮调序
const getEndJurisdiction = (id, params) => {
  return API.post('component/form/selectedAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 删除表单操作按钮
const delOperationsBtn = (id, params) => {
  return API.post('component/form/delOpeartion/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取系统按钮操作
const getSysOperationsBtn = (id, params) => {
  return API.post('common/config/sysOperationList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 提交系统按钮操作
const saveSysOperationsBtn = (id, params) => {
  return API.post('component/Form/batchInsertOperations/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取弹框容器
const getDialogVessel = () => {
  return API.post('component/DiaLog/diaLogList').catch(err => {
    console.warn(err)
  })
}
// 获取模板文件容器
const getTempCode = () => {
  return API.post('sys/exportTemplate/getExportTemplateList').catch(err => {
    console.warn(err)
  })
}
// 获取组件类型
// const getEnumValues = () => {
//   return API.post('component/category/componentTree').catch(err => {
//     console.warn(err)
//   })
// }
// common/Config/getEnumValue
// 传参：

// 获取组件配置
const getComponentsConfig = (params) => {
  return API.post('component/category/componentList', params).catch(err => {
    console.warn(err)
  })
}
// 获取URL路由
const getOneData = (params) => {
  return API.post('component/Category/getOneData', params).catch(err => {
    console.warn(err)
  })
}
export {
  saveForm,
  getOperationBtn,
  saveOperationBtn,
  sortOperations,
  getAwaitJurisdiction,
  getEndJurisdiction,
  delOperationsBtn,
  getSysOperationsBtn,
  saveSysOperationsBtn,
  getDialogVessel,
  getComponentsConfig,
  getOneData,
  getTempCode
}
