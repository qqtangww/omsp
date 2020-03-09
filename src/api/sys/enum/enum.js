/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 17:57:05
 * @LastEditTime: 2019-09-03 15:49:04
 * @LastEditors: Please set LastEditors
 */
import { API } from '@/api/basic'

// 枚举分类获取接口
const getEnumCateList = (params) => {
  return API.post('sys/EnumParameter/enumCateList', params).catch(err => {
    console.warn(err)
  })
}
// 获取懒加载数据
const getEnumChildList = (params) => {
  return API.post('custom_func/EnumParameter/lazyLoadData', params).catch(err => {
    console.warn(err)
  })
}
// 枚举分类添加/修改接口
const addEnumCateList = (params) => {
  return API.post('sys/EnumParameter/saveData/5', params).catch(err => {
    console.warn(err)
  })
}
// 新枚举分类添加/修改接口
const newAddEnumCateList = (params) => {
  return API.post('custom_func/EnumParameter/saveData/5', params).catch(err => {
    console.warn(err)
  })
}
// 枚举分类删除接口
const delEnumCateList = (params) => {
  return API.post('sys/EnumParameter/delData/5', params).catch(err => {
    console.warn(err)
  })
}
// 枚举列表获取接口
const getEnumList = (params) => {
  return API.post('sys/EnumParameter/enumList', params).catch(err => {
    console.warn(err)
  })
}
// 枚举列表添加/修改接口
const addEnumList = (params) => {
  return API.post('sys/EnumParameter/saveData/6', params).catch(err => {
    console.warn(err)
  })
}
// 新枚举列表添加/修改接口
const newAddEnumList = (params) => {
  return API.post('custom_func/EnumParameter/saveData/6', params).catch(err => {
    console.warn(err)
  })
}
// 枚举列表删除接口
const delEnumList = (params) => {
  return API.post('sys/EnumParameter/delData/6', params).catch(err => {
    console.warn(err)
  })
}
// 枚举值获取接口
const getEnumValue = (params) => {
  return API.post('sys/EnumParameter/enumValuesList', params).catch(err => {
    console.warn(err)
  })
}
// 枚举值添加/修改接口
const addEnumValue = (params) => {
  return API.post('sys/EnumParameter/saveData/7', params).catch(err => {
    console.warn(err)
  })
}
// 新枚举值添加/修改接口
const newAddEnumValue = (params) => {
  return API.post('custom_func/EnumParameter/saveData/7', params).catch(err => {
    console.warn(err)
  })
}
// 枚举值删除接口
const delEnumValue = (params) => {
  return API.post('sys/EnumParameter/delData/7', params).catch(err => {
    console.warn(err)
  })
}
// 枚举列表下的下拉框接口
const getEnumListSelect = (id, params) => {
  return API.post('sys/EnumParameter/getEnumValueSele/' + id, params).catch(err => {
    console.warn(err)
  })
}
// 枚举导入
const eunmImportVal = () => {
  return API.post('sys/EnumParameter/importEnumValueData').catch(err => {
    console.warn(err)
  })
}
// 获取父枚举
const getParentEnumList = (params) => {
  return API.post('custom_func/EnumParameter/enumParentList', params).catch(err => {
    console.warn(err)
  })
}
// 获取枚举值
const getEnumValList = (params) => {
  return API.post('sys/EnumParameter/enumValuesList', params).catch(err => {
    console.warn(err)
  })
}
// 获取子枚举值
const getSonEnum = (params) => {
  return API.post('custom_func/EnumParameter/getSonEnum', params).catch(err => {
    console.warn(err)
  })
}
// 获取枚举名称
const getSelectEnumList = (params) => {
  return API.post('custom_func/EnumParameter/selectEnumList', params).catch(err => {
    console.warn(err)
  })
}
// 获取枚举分类
const getEnumCategoryList = () => {
  return API.post('sys/EnumParameter/enumTypeValueList').catch(err => {
    console.warn(err)
  })
}
// 根据枚举值查询枚举名称
const getEnumName = (params) => {
  return API.post('custom_func/EnumParameter/enumValueGetEnumName', params).catch(err => {
    console.warn(err)
  })
}

// 枚举自定义 导出接口 --- 新模板配置页面
const getCustomExport = (params) => {
  return API.post('custom_func/EnumParameter/exportEnumValueData', params).catch(err => {
    console.warn(err)
  })
}
const moveBizcategoryEnum = (params) => {
  return API.post('custom_func/EnumParameter/moveBizcategory/6', params).catch(err => {
    console.warn(err)
  })
}
const copyEnumCategory = (params) => {
  return API.post('custom_func/EnumParameter/enumCopy', params).catch(err => {
    console.warn(err)
  })
}
export {
  getEnumCateList,
  getEnumChildList,
  addEnumCateList,
  newAddEnumCateList,
  delEnumCateList,
  getEnumList,
  addEnumList,
  newAddEnumList,
  delEnumList,
  getEnumCategoryList,
  getEnumValue,
  getEnumValList,
  addEnumValue,
  newAddEnumValue,
  delEnumValue,
  getEnumListSelect,
  getCustomExport,
  eunmImportVal,
  getParentEnumList,
  getSonEnum,
  getSelectEnumList,
  moveBizcategoryEnum,
  getEnumName,
  copyEnumCategory
}
// function enumExport(params){
//   // 导出选中的数据
//   var ids = []
//   var modelArr = []
//   let checkedData = params.that.$store.state.checkedData
//   checkedData.forEach(val => {
//     ids.push(val.i_Id)
//   })
//   let enumCatCode = ''
//   let fieRowTableData = params.that.$store.state.fieRowTableData
//   if (JSON.stringify(fieRowTableData) !== '{}') {
//     enumCatCode = fieRowTableData.CC_VW_enumCategory.v_EnumCatCode
//   }
//   if (!enumCatCode) {
//     params.that.$message.warning('枚举类型code为空，请选择对应枚举类型后重试')
//   }
//   // 获取需要传的数据
//   let logParams = params.that.commitData()
//   params.that.API.post('custom_func/EnumParameter/exportEnumValueData', { v_EnumCatCode: enumCatCode, logParams, ids, modelArr }).then()
//   window.open(params.that.API.defaults.baseURL + 'custom_func/EnumParameter/exportEnumValueData')
// }
