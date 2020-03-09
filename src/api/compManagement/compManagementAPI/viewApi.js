
// 菜单-视图模板 接口

import { API } from '@/api/basic'

// 获取模板信息
const getViewList = (params) => {
  return API.post('sys/viewManage/viewList/', params).catch(err => {
    console.warn(err)
  })
}
// 添加视图
const addViewList = (params) => {
  return API.post('sys/ViewManage/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 删除视图
const delViewList = (params) => {
  return API.post('sys/ViewManage/delData/1', params).catch(err => {
    console.warn(err)
  })
}
// 获取字段信息
const getColumnList = (id) => {
  return API.post('sys/ViewManage/columnList/' + id).catch(err => {
    console.warn(err)
  })
}
// 获取数据库表
const getDatabaseTab = (id) => {
  return API.post('sys/ViewManage/getViewTableList/' + id).catch(err => {
    console.warn(err)
  })
}
// 获取批量添加数据库表名
const getDatabaseTabName = (id) => {
  return API.post('sys/ViewManage/getViewTableList/' + id).catch(err => {
    console.warn(err)
  })
}
// 获取批量添加数据库表名
const getBatchTablefields = (id, params) => {
  return API.post('sys/ViewManage/getTableFileds/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 提交批量添加数据库字段
const addBatchTablefields = (id, params) => {
  return API.post('sys/ViewManage/batchInsertColumn/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取数据库表的字段
const getTablefields = (params) => {
  return API.post('sys/table/allFieldsList', params).catch(err => {
    console.warn(err)
  })
}
// 添加字段信息
const addColumnList = (params) => {
  return API.post('sys/ViewManage/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 删除字段信息
const delColumnList = (params) => {
  return API.post('sys/ViewManage/delData/2', params).catch(err => {
    console.warn(err)
  })
}
// 获取视图系统操作
const getViewRowSysOptios = (id, params) => {
  return API.post('sys/ViewManage/OperationsList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取行内操作
const getRowOptions = (id, params) => {
  return API.post('sys/ViewManage/OperationsList/' + id, params).catch(err => {
    console.warn(err)
  })
}

// 获取批量已选中字段
const getPitchTabField = (id, params) => {
  return API.post('sys/ViewManage/columnList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// // 获取系统按钮操作
// const getSysOptions = (id, params) => {
//   return API.post('sys/ViewManage/getBaseSysButton/' + id, params).catch(err => {
//     console.warn(err)
//   })
// }
// 获取系统按钮操作
const getRowSysOptions = (id, params) => {
  return API.post('sys/ViewManage/getBaseSysButton/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加自定义按钮操作
const addCustomOptions = (id, params) => {
  return API.post('sys/ViewManage/dealOneButtonData/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加系统按钮操作
const addSysOptions = (id, params) => {
  return API.post('sys/ViewManage/batchInsertOperations/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加自定义按钮操作拖动后排序
const moveCustomOptions = (id, params) => {
  return API.post('sys/ViewManage/operationSort/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 删除按钮操作
const delSysOptions = (id, params) => {
  return API.post('sys/ViewManage/delOpeartion/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 操作授权  等待授权页面
const awaitControl = (id, params) => {
  return API.post('sys/ViewManage/waitAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 操作授权  已待授权页面
const endControl = (id, params) => {
  return API.post('sys/ViewManage/selectedAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 字段授权  待授权页面
const fieldAwaitControl = (id, params) => {
  return API.post('sys/ViewManage/columnAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 字段授权  已授权页面
const fieldEndControl = (id, params) => {
  return API.post('sys/ViewManage/columnAuthedList/' + id, params).catch(err => {
    console.warn(err)
  })
}

// 保存排序字段排序
const saveSortField = (params) => {
  return API.post('sys/ViewManage/sortColumn', params).catch(err => {
    console.warn(err)
  })
}
// 同步数据
const syncData = (id) => {
  return API.post('sys/ViewManage/redisCacheConf/' + id).catch(err => {
    console.warn(err)
  })
}

// 配置出来的
// 添加/修改视图
const saveViewData = (params) => {
  return API.post('component/View/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 获取视图/行内操作
const getTemViewOptions = (id, params) => {
  return API.post('component/View/OperationsList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 操作授权  等待授权
const awaitTemControl = (id, params) => {
  return API.post('component/View/waitAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 操作授权  已待授权页面
const endTemControl = (id, params) => {
  return API.post('component/View/selectedAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加自定义按钮操作
const addTemCustomOptions = (id, params) => {
  return API.post('component/View/dealOneButtonData/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 删除按钮操作
const delTemSysOptions = (id, params) => {
  return API.post('component/View/delOpeartion/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加系统按钮操作
const addTemSysOptions = (id, params) => {
  return API.post('component/View/batchInsertOperations/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加自定义按钮操作拖动后排序
const moveTemCustomOptions = (id, params) => {
  return API.post('component/View/operationSort/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取数据库表
const getTemDatabaseTab = (id) => {
  return API.post('component/View/getViewTableList/' + id).catch(err => {
    console.warn(err)
  })
}
// 获取数据库表的字段
const getTemTablefields = (params) => {
  return API.post('component/View/getFields', params).catch(err => {
    console.warn(err)
  })
}
// 添加字段信息
const addTemColumnList = (params) => {
  return API.post('component/View/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 字段授权  待授权页面
const fieldAwaitTemControl = (id, params) => {
  return API.post('component/View/columnAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 字段授权  已授权页面
const fieldEndTemControl = (id, params) => {
  return API.post('component/View/columnAuthedList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取枚举分类
const getTemEnumCategoryList = () => {
  return API.post('custom_func/EnumParameter/enumTypeValueList').catch(err => {
    console.warn(err)
  })
}
// 获取枚举值
const getTemEnumValList = (id) => {
  return API.post('custom_func/EnumParameter/getEnumValueSele/' + id).catch(err => {
    console.warn(err)
  })
}

// 获取枚举值
const getEnumCateGoryList = (params) => {
  return API.post('custom_func/EnumParameter/enumCateGoryList', params).catch(err => {
    console.warn(err)
  })
}

// 提交批量添加数据库字段
const addTemBatchTablefields = (id, params) => {
  return API.post('component/View/batchInsertColumn/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取批量添加数据库表名
const getTemBatchTablefields = (id, params) => {
  return API.post('component/View/getTableFileds/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取组件参数
const getComParameter = (params) => {
  return API.post('component/Category/saveData/23', params).catch(err => {
    console.warn(err)
  })
}
export {
  getViewList,
  getColumnList,
  addColumnList,
  addViewList,
  delViewList,
  delColumnList,
  getViewRowSysOptios,
  getDatabaseTab,
  getTablefields,
  getPitchTabField,
  getDatabaseTabName,
  getBatchTablefields,
  addBatchTablefields,
  // getSysOptions,
  addCustomOptions,
  moveCustomOptions,
  delSysOptions,
  addSysOptions,
  getRowOptions,
  getRowSysOptions,
  awaitControl,
  endControl,
  fieldAwaitControl,
  fieldEndControl,
  saveSortField,
  syncData,
  // 配置出来的
  saveViewData,
  getTemViewOptions,
  awaitTemControl,
  endTemControl,
  addTemCustomOptions,
  delTemSysOptions,
  addTemSysOptions,
  moveTemCustomOptions,
  getTemDatabaseTab,
  getTemTablefields,
  addTemColumnList,
  fieldAwaitTemControl,
  fieldEndTemControl,
  getTemEnumCategoryList,
  getTemEnumValList,
  addTemBatchTablefields,
  getTemBatchTablefields,
  getEnumCateGoryList,
  getComParameter
}
