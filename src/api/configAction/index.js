// 模板实例 公共接口
import * as common from '@/api/configAction/common'
// 模板实例 配置接口
import * as tableAction from '@/api/configAction/configApi/tableAction'
import * as treeAction from '@/api/configAction/configApi/treeAction'
import * as formAction from '@/api/configAction/configApi/formAction'
import * as layout from '@/api/configAction/configApi/layout'

const configActionApi = Object.assign(
  { ...common },
  { ...tableAction },
  { ...treeAction },
  { ...formAction },
  { ...layout }
)
export default configActionApi
