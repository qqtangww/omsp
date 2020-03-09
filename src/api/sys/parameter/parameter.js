
// 菜单-参数管理 接口

import { API } from '@/api/basic'

// 参数获系统参数接口
const getSysparameter = (id, params) => {
  return API.post('sys/EnumParameter/ParameterSysList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 参数获组织参数接口
const getOrgparameter = (id, params) => {
  return API.post('sys/EnumParameter/ParameterOrgList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 参数获个人参数接口
const getUsreparameter = (id, parmas) => {
  return API.post('sys/EnumParameter/ParameterUserList/' + id, parmas).catch(err => {
    console.warn(err)
  })
}
// 添加/修改系统参数接口
const addSysParameter = (params) => {
  return API.post('sys/EnumParameter/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 修改组织参数接口
const editOrgParameter = (params) => {
  return API.post('sys/EnumParameter/saveData/3', params).catch(err => {
    console.warn(err)
  })
}
// 修改组织参数接口
const editUserParameter = (params) => {
  return API.post('sys/EnumParameter/saveData/4', params).catch(err => {
    console.warn(err)
  })
}
// 查询系统参数
const searchSysList = (id, params) => {
  return API.post('sys/EnumParameter/ParameterSysList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 查询组织参数全部/我的组织/下属组织
const searchOrgList = (id, params) => {
  return API.post('sys/EnumParameter/ParameterOrgList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 查询个人参数接口
const searchUserList = (id, params) => {
  return API.post('sys/EnumParameter/ParameterUserList/' + id, params).catch(err => {
    console.warn(err)
  })
}
// ---新配的 參數列表
// 提交保存接口  系统参数
const tempParameterSaveData2 = (params) => {
  return API.post('custom_func/EnumParameter/saveData/2', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  组织参数
const tempParameterSaveData3 = (params) => {
  return API.post('custom_func/EnumParameter/saveParamData', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  个人参数
const tempParameterSaveData4 = (params) => {
  return API.post('custom_func/EnumParameter/saveData/4', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  组件参数
const tempParameterSaveData11 = (params) => {
  return API.post('custom_func/EnumParameter/saveData/11', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  接口参数
const tempParameterSaveData12 = (params) => {
  return API.post('custom_func/EnumParameter/saveData/12', params).catch(err => {
    console.warn(err)
  })
}
// 获取系统参数
const parameterSysList = (params) => {
  return API.post('custom_func/EnumParameter/ParameterSysList', params).catch(err => {
    console.warn(err)
  })
}
// 获取组件参数
const parameterComList = (params) => {
  return API.post('custom_func/EnumParameter/componentParameterList', params).catch(err => {
    console.warn(err)
  })
}
// 获取接口参数
const parameterApiList = (params) => {
  return API.post('custom_func/EnumParameter/interfaceParameterList', params).catch(err => {
    console.warn(err)
  })
}
// 获取系统参数详细信息
const getOneSysParameter = (params) => {
  return API.post('custom_func/EnumParameter/getOneSysParameter', params).catch(err => {
    console.warn(err)
  })
}
// // 获取组件参数详细信息
// const getOneComParameter = (params) => {
//   return API.post('custom_func/EnumParameter/getOneInstanceParameter', params).catch(err => {
//     console.warn(err)
//   })
// }
// // 获取接口参数详细信息
// const getOneIntParameter = (params) => {
//   return API.post('custom_func/EnumParameter/getOneInterfaceParameter', params).catch(err => {
//     console.warn(err)
//   })
// }
// 获取组织参数详细信息
const oneOrgParameter = (params) => {
  return API.post('custom_func/EnumParameter/getOneOrgParameter', params).catch(err => {
    console.warn(err)
  })
}
// 获取参数
const getParameter = (params) => {
  return API.post('common/config/getParamData', params).catch(err => {
    console.warn(err)
  })
}

// 提交保存接口  参数组
const saveParameterGrp = (params) => {
  return API.post('custom_func/EnumParameter/saveParameterGrp', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  组参数视图
const saveParameterGrpList = (params) => {
  return API.post('custom_func/EnumParameter/saveParameterGrpList', params).catch(err => {
    console.warn(err)
  })
}
// 获取所有系统参数
const getParamSysList = (params) => {
  return API.post('custom_func/EnumParameter/getParamSysList', params).catch(err => {
    console.warn(err)
  })
}
// 获取我管理的组织
const getUserOrgList = (params) => {
  return API.post('custom_user/User/getUserOrgList', params).catch(err => {
    console.warn(err)
  })
}
// 获取参数组
const getParameterGrp = (params) => {
  return API.post('custom_func/EnumParameter/getParameterGrp', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  组织应用参数组
const addOrgParameterGrp = (params) => {
  return API.post('custom_func/EnumParameter/addOrgParameterGrp', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  个人应用参数组
const addUserParameterGrp = (params) => {
  return API.post('custom_func/EnumParameter/addUserParameterGrp', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  实例应用参数组
const addInstanceParameterGrp = (params) => {
  return API.post('custom_func/EnumParameter/addInstanceParameterGrp', params).catch(err => {
    console.warn(err)
  })
}
// 提交保存接口  参数组应用参数组
const addParameGrp = (params) => {
  return API.post('custom_func/EnumParameter/addParameGrp', params).catch(err => {
    console.warn(err)
  })
}
// 移动参数  移动至某个业务类别下
const moveBizcategory = (params) => {
  return API.post('custom_func/EnumParameter/moveBizcategory/2', params).catch(err => {
    console.warn(err)
  })
}
// 复制系统参数
const copySysParameter = (params) => {
  return API.post('custom_func/EnumParameter/sysParameterCopy', params).catch(err => {
    console.warn(err)
  })
}
// 复制参数参数组
const copyParameterGroup = (params) => {
  return API.post('custom_func/EnumParameter/parameterGrpCopy', params).catch(err => {
    console.warn(err)
  })
}

export {
  getSysparameter,
  getOrgparameter,
  addSysParameter,
  getUsreparameter,
  editOrgParameter,
  editUserParameter,
  searchSysList,
  searchOrgList,
  tempParameterSaveData2,
  searchUserList,
  tempParameterSaveData3,
  tempParameterSaveData4,
  tempParameterSaveData11,
  tempParameterSaveData12,
  parameterSysList,
  parameterComList,
  parameterApiList,
  getOneSysParameter,
  // getOneComParameter,
  // getOneIntParameter,
  getParameter,
  oneOrgParameter,
  saveParameterGrp,
  getParamSysList,
  saveParameterGrpList,
  getUserOrgList,
  getParameterGrp,
  addOrgParameterGrp,
  addUserParameterGrp,
  addInstanceParameterGrp,
  addParameGrp,
  moveBizcategory,
  copySysParameter,
  copyParameterGroup
}
