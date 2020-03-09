
import { API } from '@/api/basic'

// 用户分组  拉取 未添加 用户
const userAddGroupList = (params) => {
  return API.post('user/group/userSeleLists', params).catch(err => { console.warn(err) })
}
// 用户分组  拉取 群组成员
const userGroupList = (grpcode, params) => {
  return API.post('user/group/userLists/' + grpcode, params).catch(err => { console.warn(err) })
}
// 用户分组 添加 群组成员
const userSaveAddGroupList = (params) => {
  return API.post('user/group/dealUserGroup/1', params).catch(err => { console.warn(err) })
}
// 用户分组 删除 群组成员
const userDelGroupList = (params) => {
  return API.post('user/group/dealUserGroup/2', params).catch(err => { console.warn(err) })
}
// 用户分组 拉取 共享成员
const getUserShareList = (id, params) => {
  return API.post('user/group/shareUserLists/' + id, params).catch(err => { console.warn(err) })
}
// 用户分组 添加 共享成员
const userAddShareGroupList = (params) => {
  return API.post('user/group/dealShareUserGroup/1', params).catch(err => { console.warn(err) })
}
// 用户分组 删除 共享成员
const userDelShareGroupList = (params) => {
  return API.post('user/group/dealShareUserGroup/2', params).catch(err => { console.warn(err) })
}
// 获取分组列表信息
const getgroupList = (params) => {
  return API.post('user/Group/lists', params).catch(err => {
    console.log(err)
  })
}
// 用户列表添加 /修改 信息接口
const addgroupList = (params) => {
  return API.post('user/Group/saveData/1', params).catch(err => {
    console.log(err)
  })
}
// 用户列表删除信息接口
const delgroupList = (params) => {
  return API.post('user/Group/delData/1', params).catch(err => {
    console.log(err)
  })
}
// 拉取用户分组 组织机构
const getUserGroupOrgList = () => {
  return API.post('user/group/getUserOrg').catch(err => {
    console.log(err)
  })
}

// 配置出来的
// 获取分组列表信息
const getTemgroupList = (params) => {
  return API.post('custom_user/Group/lists', params).catch(err => {
    console.log(err)
  })
}
// 添加/修改分组
const saveTemgroupList = (params) => {
  return API.post('custom_user/Group/saveData/1', params).catch(err => {
    console.log(err)
  })
}
// 删除用户分组
const delTemgroupList = (params) => {
  return API.post('custom_user/Group/delData/1', params).catch(err => {
    console.log(err)
  })
}
// 获取机构
const getTemOrgList = (params) => {
  return API.post('custom_func/OrgGroup/orgTree', params).catch(err => {
    console.log(err)
  })
}
// 用户分组  拉取 未添加 用户
const userTemAddGroupList = (params) => {
  return API.post('custom_user/Group/userSeleLists', params).catch(err => { console.warn(err) })
}
// 用户分组  拉取 未添加 用户(模板配置扩展接口)
const userTemGroupList = (params) => {
  return API.post('custom_user/Group/userLists', params).catch(err => { console.warn(err) })
}
// 用户分组 拉取 共享成员(模板配置扩展接口)
const getTemUserShareList = (params) => {
  return API.post('custom_user/Group/shareUserLists', params).catch(err => { console.warn(err) })
}
// 用户分组 添加 分组成员
const userTemSaveAddGroupList = (params) => {
  return API.post('custom_user/Group/dealUserGroup/1', params).catch(err => { console.warn(err) })
}
// 用户分组 添加 共享成员
const userTemSaveAddShareList = (params) => {
  return API.post('custom_user/Group/dealShareUserGroup/1', params).catch(err => { console.warn(err) })
}
export {
  getgroupList,
  addgroupList,
  delgroupList,
  // 添加群组成员
  userAddGroupList,
  // 拉取群组成员
  userGroupList,
  userSaveAddGroupList,
  userDelGroupList,
  getUserShareList,
  userAddShareGroupList,
  getUserGroupOrgList,
  userDelShareGroupList,
  // 配置出来的
  getTemgroupList,
  saveTemgroupList,
  delTemgroupList,
  getTemOrgList,
  userTemAddGroupList,
  userTemGroupList,
  getTemUserShareList,
  userTemSaveAddGroupList,
  userTemSaveAddShareList
}
