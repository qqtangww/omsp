import { API } from '@/api/basic'

// tree添加/修改
const saveTree = (params) => {
  return API.post('component/Tree/saveData/1', params).catch(err => {
    console.warn(err)
  })
}
// 获取所有字段
const getTreeColums = (id, params) => {
  return API.post('component/Tree/columnList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取表名
const getTabelName = (id) => {
  return API.post('component/Tree/tableList/' + id).catch(err => {
    console.warn(err)
  })
}
// 根据表名获取表下的字段
const getTabelNameColums = (id, params) => {
  return API.post('component/Tree/tableColumnList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 保存基础字段
const saveBasicsColum = (params) => {
  return API.post('component/Tree/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 删除字段
const delColums = (params) => {
  return API.post('component/Tree/delColumnData', params).catch(err => {
    console.warn(err)
  })
}
// 批量添加字段
const volumeAddColums = (id, params) => {
  return API.post('component/Tree/batchInsertColumn/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取树的操作按钮
const getTreeOperations = (id, params) => {
  return API.post('component/Tree/operationsList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 添加树的操作
const saveTreeOperations = (params) => {
  return API.post('component/Tree/saveData/3', params).catch(err => {
    console.warn(err)
  })
}
// 添加树的节点
const saveTreeNodeConfig = (params) => {
  return API.post('component/Tree/saveData/4', params).catch(err => {
    console.warn(err)
  })
}
// 删除字段
const delNode = (params) => {
  return API.post('component/Tree/delNodeData', params).catch(err => {
    console.warn(err)
  })
}
// 添加自定义按钮操作拖动后排序
const moveTemTreeCustomOptions = (id, params) => {
  return API.post('component/Tree/operationSort/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 删除树的操作
const delTreeOperations = (id, params) => {
  return API.post('component/Tree/delOpeartion/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取待授权操作
const getAwaitJurisdictionTree = (id, params) => {
  return API.post('component/Tree/waitAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取已权操作
const getEndJurisdictionTree = (id, params) => {
  return API.post('component/Tree/selectedAuthList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取系统按钮操作
const getSystemTreeOperation = (id, params) => {
  return API.post('component/Tree/delOpeartion/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 保存系统按钮操作
const saveSystemTreeOperation = (id, params) => {
  return API.post('component/Tree/batchInsertOperations/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取树形显示数据
const getTreeShowData = (id, params) => {
  return API.post('component/Tree/sqlFieldList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 获取节点数据
const getNodeTreeData = (id, params) => {
  return API.post('component/Tree/nodeList/' + id, params).catch(err => {
    console.warn(err)
  })
}
export {
  saveTree,
  getTreeColums,
  getTabelName,
  getTabelNameColums,
  saveBasicsColum,
  delColums,
  volumeAddColums,
  getTreeOperations,
  saveTreeOperations,
  delTreeOperations,
  getAwaitJurisdictionTree,
  getEndJurisdictionTree,
  getSystemTreeOperation,
  saveSystemTreeOperation,
  getTreeShowData,
  getNodeTreeData,
  saveTreeNodeConfig,
  delNode,
  moveTemTreeCustomOptions
}
