
// 用户中心API
import userApi from '@/api/user/index'
// 系统菜单API
import sysApi from '@/api/sys/index'
// 配置功能API
import configActionApi from '@/api/configAction/index'
// 组件配置管理菜单API
import compManagementApi from '@/api/compManagement/index'
// 业务菜单API
import bussApi from '@/api/buss/index'

const cgiService = Object.assign(
  { ...userApi },
  { ...sysApi },
  { ...configActionApi },
  { ...compManagementApi },
  { ...bussApi }
)

export default cgiService
