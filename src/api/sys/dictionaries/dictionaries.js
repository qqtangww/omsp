
// 菜单-数据字典 接口
import { API } from '@/api/basic'

// 添加/修改数据表
const addOrEditDatabase = (params) => {
  return API.post('sys/Table/batchInsertRelationTable/3', params).catch(err => {
    console.warn(err)
  })
}
// 获取关联表的数据
const getRelevanceDatabase = (params) => {
  return API.post('sys/Table/allTablesList', params).catch(err => {
    console.warn(err)
  })
}
// 获取主表词段的数据
const getMasterTabelField = (params) => {
  return API.post('sys/Table/allFieldsList', params).catch(err => {
    console.warn(err)
  })
}
// 获取已添加关联表数据
const getHaveRelevanceDatabase = (params) => {
  return API.post('sys/Table/linkTableList/', params).catch(err => {
    console.warn(err)
  })
}
// 删除已添加关联表数据
const delHaveRelevanceDatabase = (params) => {
  return API.post('sys/Table/delData/3', params).catch(err => {
    console.warn(err)
  })
}
// 添加数据表
const getTableSaveData1 = (params) => {
  return API.post('sys/Table/saveData/1', params).catch(err => {
    console.warn(err)
  })
}

// 配置出來的新页面  未啟用
const temTableSaveData1 = (params) => {
  return API.post('custom_func/Table/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 移动数据字典表  移动至某个业务下
const moveBizcategoryDictionaries = (params) => {
  return API.post('sys/Table/moveBizcategory', params).catch(err => {
    console.warn(err)
  })
}

export {
  addOrEditDatabase,
  getTableSaveData1,
  getRelevanceDatabase,
  temTableSaveData1,
  getMasterTabelField,
  getHaveRelevanceDatabase,
  delHaveRelevanceDatabase,
  moveBizcategoryDictionaries
}
