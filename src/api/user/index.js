// 用户 公共接口API
import * as userCommon from '@/api/user/common'
// 用户分组API
import * as groupAPI from '@/api/user/group/group'
// 用户代理API
import * as agentApi from '@/api/user/agent/agent'
// 快捷菜单API
import * as fastMenuApi from '@/api/user/fastMenu/fastMenu'
// 修改密码API
import * as passwordApi from '@/api/user/password/password'
// 个人信息API
import * as infoApi from '@/api/user/info/info'
// 用户管理API
import * as controlApi from '@/api/user/control/control'

const userApi = Object.assign(
  { ...groupAPI },
  { ...controlApi },
  { ...fastMenuApi },
  { ...infoApi },
  { ...passwordApi },
  { ...userCommon },
  { ...agentApi }
)
export default userApi
