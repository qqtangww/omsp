// 模板实例 公共接口
import * as common from '@/api/compManagement/common'
// 组件配置 -组件类型
import * as componetsTypeApi from '@/api/compManagement/compManagementAPI/componetsType'
// 组件配置 -弹框配置
import * as dialogApi from '@/api/compManagement/compManagementAPI/dialogApi'
// 组件配置 -表单配置
import * as formApi from '@/api/compManagement/compManagementAPI/formApi'
// 组件配置 -布局组件
import * as layoutComponentApi from '@/api/compManagement/compManagementAPI/layoutComponentApi'
// 组件配置 -树组件
import * as treeApi from '@/api/compManagement/compManagementAPI/treeApi'
// 组件配置 -视图件
import * as viewApi from '@/api/compManagement/compManagementAPI/viewApi'

const compConfigApi = Object.assign(
  { ...componetsTypeApi },
  { ...dialogApi },
  { ...formApi },
  { ...layoutComponentApi },
  { ...treeApi },
  { ...viewApi },
  { ...common }
)
export default compConfigApi
