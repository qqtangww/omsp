// 系统菜单 公共接口
import * as commonApi from '@/api/sys/common'
// 访问策略 配置接口
import * as accessApi from '@/api/sys/access/access'
// 业务管理 配置接口
import * as businessApi from '@/api/sys/business/business'
// 数据字典 配置接口
import * as dictionariesApi from '@/api/sys/dictionaries/dictionaries'
// 登录 配置接口
import * as loginApi from '@/api/sys/login/login'
// 组织机构 配置接口
import * as orgApi from '@/api/sys/org/org'
// 页面管理 配置接口
import * as pageApi from '@/api/sys/page/page'
// 参数管理 配置接口
import * as parameterApi from '@/api/sys/parameter/parameter'
// 系统概要 配置接口
import * as profileApi from '@/api/sys/profile/profile'
// 密码策略 配置接口
import * as pwdApi from '@/api/sys/pwd/pwd'
// 角色管理 配置接口
import * as roleApi from '@/api/sys/role/role'
// 枚举管理 配置接口
import * as enumApi from '@/api/sys/enum/enum'
// 通知中心 配置接口
import * as notificationCenter from '@/api/sys/notificationCenter/notificationCenter'
// 通知发布 配置接口
import * as sendNotice from '@/api/sys/sendNotice/sendNotice'
// 消息模板 配置接口
import * as messageTemplateApi from '@/api/sys/messageTemplate/messageTemplate'
// 邮件发送 配置接口
import * as sendMail from '@/api/sys/sendMail/sendMail'
// 邮件模板 配置接口
import * as mailTemplate from '@/api/sys/mailTemplate/mailTemplate'
// 模板管理 配置接口
import * as tempControl from '@/api/sys/tempControl/index'
// 定期执行规则 配置接口
import * as rulesApi from '@/api/sys/rules/rules'
// 进程管理 配置接口
import * as progress from '@/api/sys/progress/progress'
// 任务规则库
import * as taskRule from '@/api/sys/taskRule/taskRule'
// 样式管理
import * as styleClass from '@/api/sys/styleManagement/styleClass'

const sysApi = Object.assign(
  { ...styleClass },
  { ...taskRule },
  { ...progress },
  { ...mailTemplate },
  { ...sendMail },
  { ...commonApi },
  { ...sendNotice },
  { ...accessApi },
  { ...businessApi },
  { ...loginApi },
  { ...dictionariesApi },
  { ...orgApi },
  { ...pageApi },
  { ...parameterApi },
  { ...profileApi },
  { ...pwdApi },
  { ...profileApi },
  { ...enumApi },
  { ...notificationCenter },
  { ...roleApi },
  { ...roleApi },
  { ...messageTemplateApi },
  { ...tempControl },
  { ...rulesApi }
)
export default sysApi
