/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-27 11:48:10
 * @LastEditTime: 2019-08-15 18:26:23
 * @LastEditors: Please set LastEditors
 */
import { API } from '@/api/basic'

// 获取树  配置
const temGetTreeConf = (TreeCode) => {
  return API.post('InterfaceGrid/getCategoryTreeConf/' + TreeCode).catch(err => { console.warn(err) })
}
// 获取树  数据
const temGetTreeData = (TreeCode) => {
  return API.post('InterfaceGrid/getCategoryTreeData/' + TreeCode).catch(err => { console.warn(err) })
}
// 树 拖拽调序接口
const temCustomTreeOrgSort = (params) => {
  return API.post('component/Custom/treeOrgSort', params).catch(err => { console.warn(err) })
}
// 树 懒加载接口
const temTreeLoadingData = (treeCode, params) => {
  return API.post('component/Custom/treeLoadingData/' + treeCode, params).catch(err => { console.warn(err) })
}

export {
  temGetTreeConf,
  temGetTreeData,
  temTreeLoadingData,
  temCustomTreeOrgSort
}
