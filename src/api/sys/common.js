import { API } from '@/api/basic'

const getRolePageOperation = (id) => {
  return API.get('sys/userRole/getRolePageOperation/' + id).catch(err => { console.warn(err) })
}
/**
 * 给角色授权页面操作
 * @param roleid=20000
 * @param pageids=[10001,10002]
 * @param pageoperation=[10001-add,10002-modify]
 * 如果 pageids 和 pageoperation 为空 则 删除授权
 */
const grantRolePageOperation = (params) => {
  return API.post('sys/userRole/grantRolePageOperation', params).catch(err => { console.warn(err) })
}

const getUserProfile = (id) => {
  return API.get('sys/userRole/getUserProfile/' + id).catch(err => { console.warn(err) })
}
// 获取组件信息
const getComonentsList = () => {
  return API.post('common/Config/pageTypeTree').catch(err => {
    console.warn(err)
  })
}
// 获取父枚举
// const getParentEnumList = (params) => {
//   return API.post('sys/EnumParameter/enumValuesList', params).catch(err => {
//     console.warn(err)
//   })
// }
const getOnLineNum = (params) => {
  return API.post('LoginApi/statOnlinePerson', params).catch(err => {
    console.warn(err)
  })
}
// 复制 公共接口
const copyData = (params) => {
  return API.post('component/Category/componentCopy', params).catch(err => {
    console.warn(err)
  })
}

export {
  getRolePageOperation,
  grantRolePageOperation,
  getUserProfile,
  getOnLineNum,
  // getParentEnumList,
  getComonentsList,
  copyData
}
